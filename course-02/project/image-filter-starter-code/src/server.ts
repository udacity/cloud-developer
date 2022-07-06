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

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query -> Check
  //    2. call filterImageFromURL(image_url) to filter the image -> Check
  //    3. send the resulting file in the response -> Check
  //    4. deletes any files on the server on finish of the response -> Check
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  app.get("/filteredImageFromURL/", async (req, res ) => {
    const { image_url } = req.query;

    // Validate URL
    if ( image_url.substring(0,7) != 'http://' && image_url.substring(0,8) != 'https://' ) {
      return res.status(400)
                .send(`URL malformed`);
    }
    const filteredpath = await filterImageFromURL(image_url);
    return res.status(200).sendFile(filteredpath, async() => deleteLocalFiles([filteredpath]));
  })

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