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

  // > try it {{host}}/filteredimage?image_url=url_here
  app.get("/filteredimage", (req, res) => {
    const { image_url } = req.query;
    if (image_url) {
      const validImg = new RegExp('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$');
      if (validImg.test(image_url)) {
        filterImageFromURL(image_url)
          .then(data => {
            console.log('DATA', data);
            res.sendFile(data);
          });
      } else res.status(404).send('invalid image_url')
    } else return res.status(400).send('image_url is required');
  });

  // app.get( "/filteredimage?image_url={{URL}}", ( req, res ) => {
  //     console.log('hey');
  // } );
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `🌸 server running http://localhost:${ port } 🌸` );
      console.log( `press CTRL+C to stop server` );
  } );
})();