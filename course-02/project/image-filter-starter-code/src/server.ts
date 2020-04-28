import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import mimetypes from 'mime-types';
import {filterImageFromURL, deleteLocalFiles, isValidUrl} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // filteredimage Endpoint
  // returns a filterimage
  app.get( "/filteredimage/", async ( req , res ) => {
    const { image_url } = req.query;

    // validate the image_url from req param.
    if (!image_url) {
        return res.status(400).send({ message: 'image_url is required' });
    }

    //check if its a valid url aswell.
    if(!isValidUrl(image_url)) {
        return res.status(400).send({ message: 'image_url is not a correct url' });
    }

    //Get filter image.
    const filterImagePath = await filterImageFromURL(image_url);
    
    //Parse the image extension for the correct header.
    const fileNameSplited =  filterImagePath.split('.');
    let fileNamExtension =  fileNameSplited[fileNameSplited.length-1];
    
    //Set header and send the filecontent
    const mime = mimetypes.lookup(fileNamExtension);
    res.set('Content-Type', (!mime) ? 'application/octet-stream' : mime);
    fs.createReadStream(filterImagePath).pipe(res);
    //Delete file
    await deleteLocalFiles([ filterImagePath ]);
  } );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req , res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();