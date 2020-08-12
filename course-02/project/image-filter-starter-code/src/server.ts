import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { isUri } from 'valid-url';
import { Request, Response } from 'express';

// testing links - https://www.google.com/images/srpr/logo4w.png

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
    //    1. validate the image_url query
    if (!image_URL || !isUri(image_URL)) {
      // sending failure response in case validation fails
      return res
        .status(400)
        .send({ auth: false, message: 'Image url is missing or malformed' });
    }
    // call filterImageFromURL(image_url) to filter the image
    const filteredImagePath = await filterImageFromURL(image_URL);
    // send the resulting file in the response
    res.status(200).sendFile(filteredImagePath, {}, () =>
      //  deletes any files on the server on finish of the response

      deleteLocalFiles([filteredImagePath])
    );
  });

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
