import express, { response } from 'express';
import bodyParser from 'body-parser';
import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { type } from 'os';

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
  //GET_PASSES_THIS_REPO_UDACITY_PLEASE

  /**************************************************************************** */

  app.get("/filteredimage/", async (req: Request, res: Response) => {
    let {image_url} = req.query;

    console.log(image_url);
    console.log(typeof image_url);
    if (!image_url) {
      return res.status(400).send({ auth: false, message: 'URL is required' });
    }

    console.log(image_url);

    await filterImageFromURL(image_url).then((response) => {
      if (response == "no image found") {
        return res.status(422).send("image processing failed");
      }
      res.status(200).sendFile(response);
      res.on(`finish`, () => deleteLocalFiles([response]));
      console.log("done");
    });

  });

  //! END @TODO1

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