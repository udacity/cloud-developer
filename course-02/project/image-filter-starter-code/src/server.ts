import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isUrl, isUrlAnImage} from './util/util';
import fs from 'fs';
import path from 'path';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/filteredimage/', async(req, res) =>{

      let {image_url} = req.query
      let isUrlImage, validUrl 

      // will throw error if url is not provided or image_url is provided as query field
      if(!image_url){
        res.status(404).send({"error": "Inavlid query field or Image Url not provided"})
      }
      else{
        
        // will check if the url provided is valid or not and will throw error if inValid 
        validUrl = await isUrl(image_url)

        if(!validUrl){
          res.status(400).send({"error": "Invalid Url Provided"})
        }
        
        // will check if the url provided is of an image with extension jpeg, jpg, gif and png
        isUrlImage = await isUrlAnImage(image_url)

        if(!isUrlImage){
          res.status(404).send({"error": "Invalid Image Url provided"})
        }
      }

      // will allow filtering of image if query field and the url provided is valid and the url is of an image
      if(image_url && isUrlImage && validUrl){
        let filteredpath = await filterImageFromURL(image_url)
        res.status(201).sendFile(filteredpath)
      }

      const directoryPath = path.join(__dirname, '/util/tmp')
      
      fs.readdir(directoryPath, function(err, files) {
        if (err) {

          res.status(400).send({"error messag": err})

        } else {
      
          deleteLocalFiles(files, directoryPath)
        
        }
      })
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("Please provide image Url")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();