import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
var validUrl = require('valid-url');
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { clearScreenDown } from 'readline';

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
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  app.get( "/filteredimage", async ( req, res ) => {
    console.log("Begin image filter")
    let  url  = req.query.image_url;
    let imagePath:string;
    if(!validUrl.isUri(url)){
      res.status(400).send('Not a valid url: '+url)
    }
    filterImageFromURL(url).then(function(imagePath){
      console.log("sending succesnfull response")
      
      res.status(200).sendFile(imagePath,function(err){
        if(err){res.status(500).send("error sending image");}
        console.log("deleting local image");
        deleteLocalFiles([imagePath]);
      });
    }).catch(function(err){
      res.status(500).send("Error: "+err)
    }) 

  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );

})();