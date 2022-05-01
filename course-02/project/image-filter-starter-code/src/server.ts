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

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query ✔️
  //    2. call filterImageFromURL(image_url) to filter the image ✔️
  //    3. send the resulting file in the response ✔️
  //    4. deletes any files on the server on finish of the response ✔️
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async (req, res, next) => {
    // get the image_url param from the reques
    const { image_url }: { image_url: string } = req.query
    // check image url is valid
    if (!image_url) {
      return res.status(422).send({ message: 'Unprocessable Entity' });
    }

    // get the filtered image result
    const filteredImage: string = await filterImageFromURL(image_url)

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