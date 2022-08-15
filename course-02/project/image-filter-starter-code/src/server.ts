// Importing Express Framework, bodyParser middleware and filter from 
// ./util/util.ts file
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

// Init the Express application
  const app = express();

// Set the network port
  const port = process.env.PORT || 8082;
  
  const my_filter = filterImageFromURL
  const del = deleteLocalFiles
// Use the body parser middleware for post requests
  app.use(bodyParser.json());

//@ToDo 1: This is the endpoint for my image filterer
  app.get("/filteredimage", async (req: Request, res: Response) => {
    const { image_url: imageUrl } = req.query;
    const filteredPath = await my_filter(imageUrl);

    res.sendFile(filteredPath, {}, () => del([filteredPath]));
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