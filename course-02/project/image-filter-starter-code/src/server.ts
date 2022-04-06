import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
var validator = require('validator');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get( "/filteredimage", async ( req, res ) => {
    // Read image url from query
    const image_url = req.query.image_url;
    let image_path = ''
    try {
      // Validate image url not null
      if(!image_url) {
        res.status(500).send("Image url can't be null");
        // Validate image url
      } else if(!validator.isURL(image_url)){
        res.status(500).send("Image url isn't valid")
      } else {
        // Filter image
        image_path = await filterImageFromURL(image_url);
        // Send file to the response
        res.sendFile(image_path, (err) => {
          // Delete image after done
          console.log([image_path])
          deleteLocalFiles([image_path])
        })

      }
    } catch(e) {
      console.log(e)
      res.status(500).send(e.toString());
    }
  } );
  //! END @TODO1
  
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