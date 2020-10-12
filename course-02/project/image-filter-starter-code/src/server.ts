import express from 'express';
import bodyParser from 'body-parser';


import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { nextTick } from 'process';

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



  app.get("/filteredimage", async function (req, res) {
      const { image_url } = req.query;

      // validate given parameter
      if (image_url == undefined || image_url == null) {
        return res.status(400).send("Please pass a valid url by query param like /filteredimage?image_url=[image url]. '" + image_url + "' doesn't look like a valid url");
      }
      const filesToDelete:string[] = new Array();

      const file = await filterImageFromURL(image_url);
      return res.status(200).sendFile(file, () => { deleteLocalFiles([file])});
 
    });
  

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