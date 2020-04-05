import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import validate from 'validate.js';

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

  //! END @TODO1
  app.get( "/filteredimage/", async ( req, res ) => {
    let { image_url } = req.query;

    // validate that image_url is present and that it matches a valid url pattern
    if ( (validate.single(image_url, {presence: true, url: true})) ) {
      return res.status(400)
                .send(`a valid URL as query param image_url is required`);
    }

    // filter image (possibly bad because there may not be an image here!)
    const filtered_image = await filterImageFromURL(image_url);

    // send filtered image as response, delete once response finished sending (or on error in response)
    res.sendFile(filtered_image, () => deleteLocalFiles(Array.of(filtered_image)));
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}");
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();