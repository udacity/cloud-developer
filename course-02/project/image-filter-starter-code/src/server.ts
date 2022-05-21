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


  //   GET /filteredimage?image_url={{URL}}
  //  endpoint to filter an image from a public url.
  app.get('/filteredimage', async (req, res) => {
    let {image_url} = req.query;
    if (!image_url) {
      return res.status(400).send({ message: 'image_url is required' });
    }
    // make sure the image_url is a valid URL
    if(!image_url.startsWith('http') || !image_url.startsWith('https')) {
      return res.status(400).send({ message: 'image_url must start with http or https' });
    }

    const filteredpath = await filterImageFromURL(image_url);
    res.status(200).sendFile(filteredpath, () => {

      deleteLocalFiles([filteredpath]);
    });
  }
  );

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