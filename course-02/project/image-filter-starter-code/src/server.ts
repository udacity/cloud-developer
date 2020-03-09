import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import validator from 'validator';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // It does the following:
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get( "/filteredimage/", async ( req, res ) => {
    let { image_url } = req.query;

    // Validate the image_url query
    const isValidUrl: boolean = validator.isURL(image_url);
    if (!isValidUrl) {
      res.status(400).send("The Image URL is not valid!");
      return;
    }

    // Filter the input image
    let filteredImageFilePath: string = await filterImageFromURL(image_url);

    // Send the resulting image
    res.status(200).sendFile(filteredImageFilePath, function(err) {
      if (err) {
        console.log("An error occured during the transfer of file: " + filteredImageFilePath);
      } else {
        console.log("Successfully sent filtered image: " + filteredImageFilePath);
      }

      // Delete temporary files
      deleteLocalFiles([filteredImageFilePath]);
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