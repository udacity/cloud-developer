import express, { response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Router, Request, Response } from 'express';
import path from 'path';
(async () => {

  // Init the Express application
  const app = express();
  const { check, validationResult } = require ('express-validator');
  //init file system
  const fs = require ('fs');
 //init url-exist
  const urlExist = require("url-exist");

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
  app.get ('/filteredimage',
  [check('image_url').isURL()],
  async function (req:Request, res:Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    const {image_url} = req.query;
    console.log(image_url);
    if(!urlExist(image_url))
      return res.status(404).send("URL Doesn't Exist");
    const filtered_image =await filterImageFromURL(image_url);
   // console.log(filtered_image);
    /*if(filtered_image == "Invalid URL")
    {
      return res.status(404).send("Invalid URL Image is not found");
    }*/
    res.status(200).sendFile(filtered_image) ;
    
    res.on('finish', function(){
      console.log('the response has been sent');
      const tempFolder = __dirname + path.sep + "util" + path.sep + "tmp" + path.sep;

      const filesToDelete = fs.readdirSync(tempFolder);
      let pathsToDelete : string[] = [];
      for(let i : number = 0; i<filesToDelete.length; i++)
      {
        console.log(tempFolder + filesToDelete[i])
        pathsToDelete.push(tempFolder + filesToDelete[i]);
      }
      deleteLocalFiles(pathsToDelete);
      });
      
      return
  
    
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

