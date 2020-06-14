import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';

import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { doesNotReject } from 'assert';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

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

  app.get("/filteredimage", async (req, res) => {
    const image_url = req.query.image_url

    // check if image URL is missing
    if (!image_url) {
      return res.status(400).send({ message: 'A valid image_url is required' });
    }

    // Try filtering the image from the given url
    var image_path = filterImageFromURL(image_url);

    // If downloaded successfully, send the image to uer and delete
    // On error, send an error message to the user
    image_path.then(function (image_path) {
      return res.status(200).sendFile(image_path, function () {
        deleteLocalFiles([image_path]);
      });
    }).catch(function (error) {
      return res.status(422).send({
        "message": error,
        "image_url": image_url
      });
    });

  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();