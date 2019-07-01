import express, { Request, Response, Router } from "express";
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res:Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  // endpoint to filter an image from a public url
  app.get( "/filteredimage/", async ( req: Request, res:Response ) => {
    // URL of a publicly accessible image
    const { image_url } = req.query;
    // validate the image_url query
    if ( !image_url ) {
      res.status(400).send(`image_url required`);
    }
    const img_url = req.query.image_url;
    // Filter the image
    filterImageFromURL(img_url).then(async(data) => {
      // Send the resulting file in the response
      res.sendFile(data, {}, function (err) {
        // Deletes any files on the server on finish of the response
        deleteLocalFiles([data]);
      })
    });
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
