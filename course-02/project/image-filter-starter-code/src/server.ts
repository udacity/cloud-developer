import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/filteredimage", async ( req, res ) => {
    const {image_url} = req.query;
    // 1. validate the image_url query
    if (image_url === undefined || image_url === null || image_url === "") {
      res.status(400).send("Bad request")
    }
    let file: string;
    // 2. call filterImageFromURL(image_url) to filter the image
    await filterImageFromURL(image_url).then(
      result => {
          // 3. send the resulting file in the response
          res.status(200).sendFile(result, () => {
          const fs = require('fs');
          // 4. deletes any files on the server on finish of the response
          fs.unlinkSync(result);
        });
        file = result;
      },
      error => {
        res.status(500).send("Error: " + error);
      }
    );
  } );
  
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