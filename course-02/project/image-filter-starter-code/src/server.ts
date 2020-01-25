import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Request, Response } from 'express';


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
  app.get('/filteredimage', async (req: Request, res: Response) => {
    res.on('finish', () => {
      const directoryPath = path.join(__dirname, 'util/tmp');
      //passsing directoryPath and callback function
      fs.readdir(directoryPath, function (err, files) {
          //handling error
          if (err) {
              return console.log('Unable to scan directory: ' + err);
          }
          const absolutePaths: Array<string> = [];
          files.forEach((file) => {
            absolutePaths.push(path.join(directoryPath, file))
          })
          deleteLocalFiles(absolutePaths);
      });
    });

    let {image_url} = req.query;
    if (!image_url) {
      return res.status(400).send({'message': 'image_url is required or malfromed'})
    }

    const filteredImagePathPromise = filterImageFromURL(image_url);
    filteredImagePathPromise.then((path) => {
      res.status(200).sendFile(path);
    }).catch((errorMessage) => {
      res.status(500).send({'message': errorMessage});
    });

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