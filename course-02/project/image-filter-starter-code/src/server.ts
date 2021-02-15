import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, isUrl } from './util/util';
import got from 'got/dist/source';

require('dotenv').config();

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  const authUrl = process.env.AUTH_REST_API_URL || 'http://localhost:8080/api/v0/users/verification';

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  async function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({ message: 'No authorization headers.' });
    }
    try {
      await got(authUrl, {
        headers: {
          authorization: req.headers.authorization
        }
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Authentication failed' });
    }
  }

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  app.get('/filteredimage',
    requireAuth,
    async (request, response, next) => {
      const url = request.query.image_url;
      if (url && isUrl(url)) {
        try {
          const fileName = await filterImageFromURL(url);
          return response.sendFile(fileName, async (err) => {
            await deleteLocalFiles([fileName]);
            if (err) {
              next(err);
            }
          });
        } catch (err) {
          console.log(err);
          return response.status(422).send({
            message: `Unable to process resource at url=${url}`,
          });
        }
      } else {
        return response.status(400).send({
          message: 'Query parameter image_url must be a valid url',
        });
      }
    });

  /**************************************************************************** */

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