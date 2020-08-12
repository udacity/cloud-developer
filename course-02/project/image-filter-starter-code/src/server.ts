import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { isUri } from 'valid-url';
import { Request, Response } from 'express';

// tested links - https://www.google.com/images/srpr/logo4w.png

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  app.get('/filteredimage', async (req: Request, res: Response) => {
    const { image_url: image_URL } = req.query;
    if (!image_URL || !isUri(image_URL)) {
      return res
        .status(400)
        .send({ auth: false, message: 'Image url is missing or malformed' });
    }

    const filteredImagePath = await filterImageFromURL(image_URL);

    res
      .status(200)
      .sendFile(filteredImagePath, {}, () =>
        deleteLocalFiles([filteredImagePath])
      );
  });
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
  app.get('/', async (req, res) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });

  // Starting the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
