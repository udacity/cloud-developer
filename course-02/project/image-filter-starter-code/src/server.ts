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

  app.get( "/filteredimage/", ( req: express.Request, res: express.Response ) => {
    let { image_url } = req.query;
    if ( !image_url ) {
      return res.status(400).send("Please provide image_url");
    }
    if ( typeof image_url !== "string" ) {
      res.status(500).json({ error: 'Invalid image_url' });
      return;
    }   
    filterImageFromURL(image_url).then(imagePath => {
        return res.status(200).sendFile(imagePath, err => {
          if (!err) {
            let filesList: string[] = [imagePath];
            deleteLocalFiles(filesList);
          }
        });
      }).catch(() => {
        return res.status(422).send("Image processing error");
      });
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