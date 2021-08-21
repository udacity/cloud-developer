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

  app.get("/filteredimage", async (Request: req, Ressponse: res) => {
    const { image_url }: { image_url: string } = req.query;

    //checking for availability of image URL
    if (image_url === "") {
      res.status(400).send("image_url not found");
      return;
    }

    //regular expression to validate the provided image_url
    const expression: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%._\+.~#?&//=]*)/gi;

    //match comparison between provided image_url and regular expression
    if (!image_url.match(RegExp(expression))) {
      res.status(400).send("image_url does not match");
      return;
    }

    //validate the received image type
    if (
      !image_url.toLowerCase().endsWith(".jpg") &&
      !image_url.toLowerCase().endsWith(".png") &&
      !image_url.toLowerCase().endsWith(".gif") &&
      !image_url.toLowerCase().endsWith(".bmp") &&
      !image_url.toLowerCase().endsWith(".tiff") &&
      !image_url.toLowerCase().endsWith(".svg")
    ) {
      res.status(400).send("image type of format not suppported");
    }

    const promiseImage: Promise<string> = filterImageFromURL(image_url);

    promiseImage.then((image) => {
      res.sendFile(image, () => {
        const imagesToDelete: Array<string> = new Array(image);
        deleteLocalFiles(imagesToDelete);
      });
    }).catch((error) => {
      res.status(400).send("image not found");
      return;

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
}) ();