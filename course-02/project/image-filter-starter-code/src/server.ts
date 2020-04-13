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

  app.get('/filteredimage', async (req: Request, res: Response) => {
    
    // get image url
    let { image_url } = req.query;

    // validate image_url
    if ( !image_url ) {
      return res.status(400).send(`image_url is required`);
    }
    
    // filter image
    const filteredImagePath = await filterImageFromURL(image_url);

    if (filteredImagePath==null) {
      return res.status(422).send(`image could not be filtered`);
    }
    
      // send file in resp
    res.sendFile(filteredImagePath);
    
      // clean up
    await new Promise(resolve => setTimeout(resolve, 500)); // delete file was not working unless I delayed.  Not sure why.
    await deleteLocalFiles([filteredImagePath]);
    
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