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

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  // Endpoint for filteredimage
  // Tagkes in a url for the image and returns the filtered version using the precreated 
  // util function to adjust colours and size.
  app.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query;
    let imageList = new Array;

    if (!image_url){
      // Return bad request if no image_url parameter is passed into the endpoint
      res.status(400).send("Request is missing the image_url parameter.");
    } else {
      try {
        // Read in the file from the URL and process with filter util
        let image = await filterImageFromURL(image_url);
        res.status(200).sendFile(image, (error) => {
          if (error) {
            console.log("Received error " + error);
          } else {
            imageList.push(image);
            deleteLocalFiles(imageList);
            console.log("Completed response and successfully deleted file." + image);
          }
        });
        
      } catch (error) {
        // Return a 422 Unprocessible entity if the file errors on Jimp.read or filtering
        console.log(error);
        res.status(422).send("The image you passed in the request query returned an error.");
      }
      
    }
  } ); 

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
