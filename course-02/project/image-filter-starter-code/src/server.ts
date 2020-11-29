import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { filter } from 'bluebird';

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
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  app.get('/filteredimage', async (req: express.Request, res: express.Response) => {
    //    1. validate the image_url query
    const { image_url: imageUrl } = req.query;
    if (!imageUrl) {
      res.statusCode = 400;
      return res.send("Bad Request");
    }
    try {
       //    2. call filterImageFromURL(image_url) to filter the image
      const filtered = await filterImageFromURL(imageUrl);
      res.on('finish', () => {
        try {
          //    4. deletes any files on the server on finish of the response
          deleteLocalFiles([filtered]);
        } catch {
          console.error(`Error deleting ${filtered}`);
        }
      });
     // 3. send the resulting file in the response
      return res.sendFile(filtered);
    } catch (e) {
      res.statusCode = 500;
      return res.send(e.message || 'Unknown server error');
    }
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( '/', async ( req, res ) => {
    res.send('try GET /filteredimage?image_url={{}}')
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();