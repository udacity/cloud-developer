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

  app.get("/filteredimage", async ( req, res ) => {
    var image_url = req.query.image_url;
    // validate the image url
    if(!image_url){
     res.status(400).send('image url is required');
    }
    //Filtering the image using the given utility function
    const result = await filterImageFromURL(image_url);
    res.status(200).sendFile(result, err => { if (err) {
      res.status(500);
    }
    //delete the local files after filtering the image
    deleteLocalFiles([result])});
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