import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Request, Response } from 'express';
import fs from "fs";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req: Request, res: Response) => {
    try{
      const image_url = req.query.image_url;
      console.log(image_url);
      if(image_url === undefined){
        return res.status(400).send({ message: 'ERROR: image_url required' });
      }

      const filePath = await filterImageFromURL(image_url);
      let localFiles: string[] = [filePath];
      
      res.status(200).sendFile(filePath);
      req.on('close', () => {
        deleteLocalFiles(localFiles);
      })
    } catch(error) {
      return res.status(500).send({ message: 'ERROR: Something went wrong, request Failed' });
    }
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();