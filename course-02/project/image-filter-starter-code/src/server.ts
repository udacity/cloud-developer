
import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, deleteTempFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req, res) => {
    try {
      const imageUrl = req.query.image_url;
      const regex = new RegExp(/(jpg|jpeg|gif|png|webp)((\?.*)$|$)/mg);

      if (!imageUrl.match(regex)) {
        return res.send(`Not valid image url ${imageUrl}`);
      }

      const filteredImagePath = await filterImageFromURL(imageUrl);
      res.sendFile(filteredImagePath);
      deleteTempFiles();
    } catch (e) {
      console.log(e)
      return res.send(`Not valid image url`);
    }
  })

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