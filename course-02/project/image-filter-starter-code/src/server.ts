import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import { config } from './config/config';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({ message: 'No authorization headers.' });
    }

    const token_bearer = req.headers.authorization.split(' ');
    if (token_bearer.length != 2) {
      return res.status(401).send({ message: 'Malformed token.' });
    }

    const token = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
      }
      return next();
    });
  }

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

  app.get("/filteredimage", requireAuth, async (req, res) => {

    let image_url = req.query.image_url;

    //    1. validate the image_url query
    if (!image_url) {
      return res.status(400).send("image url is required");
    }

    // AWS.getGetSignedUrl itself contains query parameters that are processed as /filteredimage parameters.
    // The wohle req.query obj looks like this:
    /*{"image_url": "https://<bucket-name>.s3.eu-central-1.amazonaws.com/aws_400x400.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256",
      "X-Amz-Credential": "AKIAUOH4IVTWRBU2Y3FB%2F20210707%2Feu-central-1%2Fs3%2Faws4_request",
      "X-Amz-Date": "20210707T091914Z",
      "X-Amz-Expires": "300",
      "X-Amz-Signature": "ea629df0b37f03e657c1c663509f4247224276f7b8285263af698c3cff1db386",
      "X-Amz-SignedHeaders": "host"}*/
    // Notice the first parameter "image_url" itself has an ? and a parameter "X-Amz-Algorithm".
    // The next parameters are needed as parameters of the provided image_url and shoud be appended.
    // Resulting in a url like this:
    // https://<bucket-name>.s3.eu-central-1.amazonaws.com/aws_400x400.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUOH4IVTWRBU2Y3FB%2F20210707%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210707T091914Z&X-Amz-Expires=300&X-Amz-Signature=ea629df0b37f03e657c1c663509f4247224276f7b8285263af698c3cff1db386&X-Amz-SignedHeaders=host

    // Workaround:
    if (Object.keys(req.query).length > 1) {
      image_url = req.originalUrl.replace('/filteredimage?image_url=', '');
    }

    //    2. call filterImageFromURL(image_url) to filter the image
    let filteredpath: string;
    try {
      filteredpath = await filterImageFromURL(image_url);
    } catch (error) {
      return res.status(422).send("filterImageFromURL error occured: " + error);
    }

    //    3. send the resulting file in the response
    res.sendFile(filteredpath, function (err) {
      if (err) {
        console.error("sendFile error occured: " + err);
        return res.status(500).send("sendFile error occured: " + err);
      } else {
        //    4. deletes any files on the server on finish of the response
        deleteLocalFiles([filteredpath]);
        console.info("deleted file " + filteredpath.split('/tmp/')[1]);
      }
    })
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