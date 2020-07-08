import express from 'express';
import HttpStatus from 'http-status-codes';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Importing a image url validator to ensure that a valid image url is used
  const isImageUrl = require('is-image-url');

  // Rest endpoint to filter the image using utiity functions
  app.get("/filteredimage", async ( req:express.Request, res:express.Response ) => {
    const image_url = req.query.image_url;
    // validate the image url
    if(!image_url || !isImageUrl(image_url)){
      res.status(HttpStatus.BAD_REQUEST).send('Image url is required. Please retry with a valid url');
    }
    //Filtering the image using the given utility function
    const result = await filterImageFromURL(image_url);
    res.status(HttpStatus.OK).sendFile(result, err => { 
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Unknown error occured in server. Please retry your request.");
      }
    //delete the local files after filtering the image
    deleteLocalFiles([result]);
  });
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