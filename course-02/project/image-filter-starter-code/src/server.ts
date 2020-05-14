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
  app.get( "/filteredimage", async ( req, res ) => {
    //const {image_url} = req.query.image_url;
    let {image_url} = req.query;

    console.log('Got image_url: ${image_url}');

    if(!image_url) {
      res.status(400).send('image_url parameter is missing');
    }  
    
    let image_file:string;

    //handle bad url parameter:
    try {
      image_file = await filterImageFromURL(image_url);
    } catch(error) {
      res.status(500).send('Error on filterImageFromURL:' + error);
    }

    console.log('Got image file url: ${image_file}');

    res.sendFile(image_file, () => {
      console.log('Before delete local file ${image_file}');
      deleteLocalFiles([image_file]).catch(error => {console.error(error)});
      console.log('After delete local file ${image_file}');
    })
  });
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