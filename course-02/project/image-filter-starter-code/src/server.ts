import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {
filterImageFromURL,
deleteLocalFiles
} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  /**************************************************************************** */
  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
      // destruct our query paramaters
      let { image_url } = req.query;

      if ( !image_url ) {
        return res.status(400)
                .send(`image_url is required as query param.`);
      }

      const filteredPath = await filterImageFromURL(image_url);
      if (!filteredPath) {
        return res.status(500)
                .send(`filtered image could not be composed.`);
      }

      // return the resulting list along with 200 success
      res.status(200).sendFile(filteredPath, () => { deleteLocalFiles([filteredPath]); });
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
