import express, { Router, Request, Response } from 'express';
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
  app.get( '/filteredimage/',
    ( req: Request, res: Response ) => {
      let { image_url } = req.query;

      if ( !image_url ) {
        return res.status(400)
                  .send(`image url is required`);
      }
      console.log(`Filtering image: ${image_url}`)

      //filter image_url 
      filterImageFromURL(image_url)
        .then(local_image => { 
          console.log(`Filtered Image: ${local_image}`);
          return res.status(200).sendFile(local_image, function(err){
            if (err) {
              console.log(err)
            } else {
              console.log('deleting:', local_image);
              deleteLocalFiles([local_image]);
            }
          }); 
        })
        .catch(error => {
          console.error(`Error: Unable to process image ${image_url}`);
          return res.status(404).send(`Error unable to filter image ${image_url}`);
        })
  } );
  //! END @TODO1

  app.get( "/cars/:id", 
  ( req: Request, res: Response ) => {
    let { id } = req.params;

    if ( !id ) {
      return res.status(400)
                .send(`id is required`);
    }
    return res.status(200).send(`Returning car of ${id}`);
    
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