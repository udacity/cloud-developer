// Imports
import express, { Request, Response } from "express";
import { isUri } from "valid-url";
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

//@ToDo 1: This is the endpoint for image filterer
  app.get("/filteredimage", async (req: Request, res: Response) => {
    const { image_url: imageUrl } = req.query;
    if (!imageUrl || !isUri(imageUrl)) {
      return res.status(400).send({ auth: false, message: 'Image url is missing or malformed' });
    }

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