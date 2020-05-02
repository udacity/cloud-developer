import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Filter image from query param
  app.get("/filteredimage",
    async (req: Request, res: Response) => {
      let {image_url} = req.query;

      if (!image_url) {
        return res.status(400)
          .send(`image_url is required`);
      }

      await filterImageFromURL(image_url)
        .then(async filteredImagePath =>
          res.sendFile(filteredImagePath, function (err) {
            if (err) {
              console.log('Error on transfer', err)
            } else {
              console.log('Sent:', filteredImagePath);
            }
            //we want to delete tmp file even if there is an error during send
            deleteLocalFiles([filteredImagePath]);
          }))
        .catch((err) => {
          console.log('Unable to filter image from URL', err);
          res.status(422)
            .send(`not able to process the specified image`);
        });
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