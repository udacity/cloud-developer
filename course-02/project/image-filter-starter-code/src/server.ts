import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import fs from "fs";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req, res, next) => {
    // get the image_url param from the reques
    const { image_url }: { image_url: string } = req.query
    // check image url is valid
    if (!image_url) {
      return res.status(422).send({ message: 'Unprocessable Entity' });
    }
    let filteredImage: string
    try {
      // get the filtered image result
      filteredImage = await filterImageFromURL(image_url)
    } catch (error) {
      console.log("Image parsing error :", error)
      return res.status(500).send({ messag: `this url: ${image_url} can not be processed` })
    }

    res.sendFile(filteredImage, (err) => {
      if (err) {
        next(err);
      } else {
        // Read all files from the temp folder
        const imagesDir: string = __dirname + "/util/tmp"
        fs.readdir(imagesDir, (err, filesArray: Array<string>) => {
          if (err) {
            console.log("file read error", err, imagesDir)
          } else {
            // build a list of complet file paths
            const imagesArray: Array<string> = filesArray.map(file => imagesDir + `/${file}`)
            // pass the arrray to the delete function
            deleteLocalFiles(imagesArray)
          }
        });
      }
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