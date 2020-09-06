import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, sendError} from './util/util';
import {isWebUri} from 'valid-url'
import Jimp from "jimp";
import {requireAuth} from "./authentication";

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
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage",
    requireAuth,
    async (req: Request, res: Response) => {
    const {image_url}: {image_url: string|undefined} = req.query;

    if (!image_url) {
      return sendError( res, 400, "parameter image_url is required.");
    }

    if (!isWebUri(image_url)) {
      return sendError( res, 400, "parameter image_url must be a valid url on the web.");
    }

    try {
        const image: Jimp = await filterImageFromURL(image_url);
        return res.type(image.getMIME()).send(await image.getBufferAsync(image.getMIME()));

    } catch (error) {
      console.error(error);
      return sendError( res, 422, "couldn't process given image");
    }
  })
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();

