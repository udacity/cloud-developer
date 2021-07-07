import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

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

  app.get('/filteredimage', async (req, res) => {
    // store a users imageUrl as myImageUrl, provided in query paramaters
    const myImageUrl = req.query.imageUrl;

    // if image has problems, a 400 will be returned with a message about a broken image or incomplete url
    if (!myImageUrl) {
      return res.status(400).send({
        message:
          'The url you are trying to use for this image does not work or is not complete, please try again.',
      });
    }

    // if image is present, a new filteredImage is created using await filterImageFromURL imported from utils
    // once the image is shown, it is deleted after to clear up space
    try {
      const filteredImageFromURL = await filterImageFromURL(myImageUrl);
      res.sendFile(filteredImageFromURL, () =>
        deleteLocalFiles([filteredImageFromURL])
      );
    } catch (error) {
      // if there is an error, returns a status of 422 (not processesable) and a message about a broken image or incomplete url
      return res.sendStatus(422).send({
        message:
          'The url you are trying to use for this image does not work or is not complete, please try again.',
      });
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  // app.get('/', async (req, res) => {
  //   res.send('try GET /filteredimage?image_url={{}}');
  // });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
