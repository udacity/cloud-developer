import express, { response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isSupportedFormat } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  /**************************************************************************** */
  // GET /filteredimage?image_url={{URL}}
  // This endpoint filters an image from a public url.
  // It does the following:
  //    1. validates the image_url query, accepting files suffixed with .jpg and .jpeg
  //    2. calls filterImageFromURL(image_url) to filter the image
  //    3. sends the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMETERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file
  /**************************************************************************** */
  app.get("/filteredimage", async( req, res) => {
    let image_url = req.query.image_url;   // pull image_url from query string

    if (! image_url) {
       return res.status(400).send(`Supply an image_url, like this: /filteredimage?image_url=<your image url>`); 
    }

    let supportedFormat = await isSupportedFormat(image_url);
    if (! supportedFormat) {
      return res.status(400).send("Supported formats include .jpg and .jpeg")
    }

    let errorMessage = `URL ${image_url} is not an Image in a supported format`
    try {
      let filteredImage = await filterImageFromURL(image_url);
      if (filteredImage==="error"){
          res.status(415).send(errorMessage);
      }
      else{
          res.status(200).sendFile(filteredImage, () => {deleteLocalFiles([filteredImage])});
      }
    }
    catch (error) {
      res.status(400).send(errorMessage);
    }
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("Try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();