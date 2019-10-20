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

  app.get("/filteredimage", async ( req, res ) => {
    let { image_url: image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
                .send(`image_url is required`);
    }

    var fetchImage = filterImageFromURL(image_url);
    fetchImage.then(function(filename) {
      console.log(`filename is: ${filename}`);
      res.status(200).sendFile(filename);
      res.on('finish', function() {
        try {
          let filenames = []
          filenames[0] = filename;
          deleteLocalFiles(filenames);
          console.log(`File ${filename} deleted`);
        }
        catch (e) {
          console.log("Error removing file ", filename)
          return res.status(500).send(`Error removing file ${filename}`);
        }
      } );  
    }).catch(function() {
          console.log(`Error fetching url ${image_url}`);
          return res.status(422).send(`Error fetching url ${image_url}`);
    });
    // const filename = await filterImageFromURL(image_url);
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