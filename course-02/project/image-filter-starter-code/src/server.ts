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

  // Implement /filterimage endpoint
  // upload and process an image from url 
  app.get("/filteredimage", async (req, res) => {
    
    const { image_url } = req.query;
    
    if (!image_url) {
      return res.status(400).send("Image url is required!");
    }

    const filtered_image_path = await filterImageFromURL(image_url)
    .then((image_path) => {
      res.status(200).sendFile(image_path, (err) => {
        if (err) {
          return res.status(500);
        }
        deleteLocalFiles([image_path])
      });

    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send('Image not found!');
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