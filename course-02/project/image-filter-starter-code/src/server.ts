import {Request,Response} from 'express';
import express from 'express'
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import fs from 'fs';

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
  //sample URL https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&h=350
  // Displays a simple message to the user
  app.get("/filteredimage", async (req:Request, res:Response) => {

    let image_url:string  = req.query.image_url;
    
    if (image_url != undefined && image_url != "") {

      filterImageFromURL(image_url).then((response) => {
        res.sendFile(response,()=>{
          console.log("Done!")
          deleteLocalFiles([response]);
        });
      }).catch((err) => {
        console.error(err)
        res.status(500).send("Unexpected error occured")
      }).finally(() => {
        console.log("Image filtered")
      })

    } else {
      res.status(422).send("Image URL is not defined in query string")
    }
  });

  app.get("/", async (req:Request, res:Response) => {
    res.send("Filter Image")
  })



  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();