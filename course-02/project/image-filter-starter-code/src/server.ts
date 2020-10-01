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

  // GET /filteredimage?image_url={{URL}}
  /**************************************************************************** */
  app.get("/filteredimage/", async (req, res) => {
    const image_url = req.query.image_url;

    //validate the image_url
    if (!image_url) {
      return res.status(400).send("Image url is missing or not valid.");
    }

    try {
      //filter the image
      const filteredImage = await filterImageFromURL(image_url);

      //send the filtered image then delete it
      return res.status(200).sendFile(filteredImage, () => deleteLocalFiles([filteredImage]));
    } catch (err) {
      return res.status(422).send("Unable to load photo.");
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