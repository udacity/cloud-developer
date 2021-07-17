import express, { response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isSupportedFormat, doesFileExist2 } from './util/util';
import { resolve } from 'bluebird';

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
  // QUERY PARAMETERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */


  app.get("/filteredimage", async( req, res) => {
    let image_url = req.query.image_url;   // pull image_url from query string

    if (! image_url) {
       return res.status(400).send(`Supply an image_url, like this: /filteredimage?image_url=<your image url>`); 
    }
    if (! isSupportedFormat(image_url)) {
      return res.status(400).send("Supported formats include .jpg and .png")
    }

    try {
      let filteredImage = await filterImageFromURL(image_url);
      if (filteredImage==="error"){
          res.status(415).send('URL is not an Image');
      }
      else{
          res.status(200).sendFile(filteredImage, () => {deleteLocalFiles([filteredImage])});
      }
    }
    catch (error) {
      console.log("unable to filter image")
      res.status(400).send(`URL ${image_url} is not an Image`);
    }


    // filterImageFromURL(image_url)
    //   .then(filteredpath => {
    //      res.status(200).sendFile(filteredpath, () => {deleteLocalFiles([filteredpath]);} );
      
    // })

  })
  //! END @TODO1
  
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