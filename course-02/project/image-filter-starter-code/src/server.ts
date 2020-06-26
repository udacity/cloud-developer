import express from 'express';
import { sequelize } from './sequelize';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';

(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  const files:Array<string> = [];
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.use(function(req, res,next){
    res.on('close', function(){
        console.log('the response has been sent');
        deleteLocalFiles(files).then(()=>{
          console.log('Files deleted from local folder')
        }).catch((err)=>{
          console.log('Error encountered', err);
        });
        files.length=0;
    });
    next();
  });
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
  app.get( "/filteredimage", async ( req, res ) => {
    const imageUrl = req.query.image_url;
    console.log('Requested url:', imageUrl);
    let filepath='';
    try{
      filepath = await filterImageFromURL(imageUrl);
    }
    catch(err){
      console.log(err);
      res.status(500).send('Error reading image from provided URL');
    }
    console.log("FILEPATH: ", filepath);
    files.push(filepath);
    res.sendFile(filepath);
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );


})();