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

//Filter image endpoint
app.get( "/filteredimage", async ( req, res ) => {
    const imageUrl = req.query.image_url;
    if(!!imageUrl)
    {
      await filterImageFromURL(imageUrl).then(result=>{
        res.sendFile(result);
        res.on("finish", ()=> deleteLocalFiles([result]))
      })
    }
    else
      res.status(400).send("Please send a valid image url.")
  } );
  
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