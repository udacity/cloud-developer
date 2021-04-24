import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { resolve } from 'path';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // filter an image
  app.get( "/filteredimage/", async ( req, res ) => {
    const { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400).send(`image_url is required`);
    }

    const filterImage = await filterImageFromURL(image_url);

    if ( !filterImage ) {
      return res.status(400).send(`unable to filter image for url of ${image_url}`);
    }

    res.status(200).sendFile(filterImage, (err) => {
      if ( err ) {
        console.log(`error occurred in file transfer`);
      }
      else {
        deleteLocalFiles([filterImage]);
      }
    });
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