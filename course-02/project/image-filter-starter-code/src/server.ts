import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());



  app.get( "/filteredimage/",  async ( req: Request, res: Response ) => {
    let { image_url } = req.query;

    validate_image_url(image_url, res);

    
  

     filterImageFromURL(image_url).
      then ( (v)=> { 
        res.status(200).sendFile(v)
        delete_temp_file(res, v);
      }
      )
      .catch( (x)=>{ res.status(400).send("something went wrong while fetching " + image_url);})

     
    
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

function delete_temp_file(res: express.Response, v: string) {
  res.on('finish', () => { deleteLocalFiles([v]); });
}

function validate_image_url(image_url: any, res: express.Response) {
  if (!image_url) {
    res.status(400)
      .send(`image_url is required`);
  }
}
