import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { finished } from 'stream';

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
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/filteredimage/", async ( req, res ) => {
    let { image_url } = req.query;
    console.log(image_url);
    if(!image_url) {
      res.status(400).send("Can't found an image");
    } else {
      try {
      //call function to filter image on image_url
      let img = await filterImageFromURL(image_url);
      //list file to delete at final stage
      var listFile = new Array;       
      //sent the filtered image to website
      listFile.push(img);
      res.status(200).sendFile(img);
      //wait for response finish after that delete image file
      function function1() {
        deleteLocalFiles(listFile);
      }
      res.on('finish', function1)
      }catch (error){
        //catch error if filterImageFromURL function can't read the URL 
        console.log(error);
        res.status(400).send("Can't read the image");
      } 
    }  
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();