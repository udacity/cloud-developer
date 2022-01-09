import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // const BASIC_URL_REGEX: string = "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]*\.[a-zA-Z0-9()]*\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)";
  // const URL_REGEX: RegExp = new RegExp(BASIC_URL_REGEX);
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query - DONE
  //    2. call filterImageFromURL(image_url) to filter the image - DONE
  //    3. send the resulting file in the response - done
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/filteredimage", async ( req, res,  ) => {
  const {image_url}: {image_url: string} = req.query

  if(!image_url) {
    res.status(400).send("The required image_url was not provided");
  }

  // if(!image_url.match(URL_REGEX)) {
  //   res.status(400).send("Malformed image_url");
  // }

  const path: string = await filterImageFromURL(image_url);

  res.on('finish', () => {
    deleteLocalFiles(new Array(path))
  }).status(200).sendFile(path);
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();