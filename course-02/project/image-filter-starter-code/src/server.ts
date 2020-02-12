import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import {generateJWT, requireAuth} from './util/auth.util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // console.log('THIS IS THE JWT TOKEN!', generateJWT());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  async function getFilterImageFromUrl(req: Request, res: Response) {
    const queryStrings = req.query;
    const image_url = queryStrings.image_url;
    if (!image_url) {
      return res.status(500).send({message: 'Missing image_url as param'});
    }

    try {
      const results = await filterImageFromURL(image_url);
      res.send(results);
      deleteLocalFiles([results]);
    } catch (e) {
      // throws error if filterImageFromUrl fails
      console.log('err', e);
      return res.status(500).send({message: 'Failed to filter and fetch image from url'});
    }
  }

  app.get("/filteredimage/auth", requireAuth, getFilterImageFromUrl);
  app.get("/filteredimage", getFilterImageFromUrl);
  //! END @TODO1
  
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