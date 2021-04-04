import express from "express";
import bodyParser from "body-parser";
import {
  filterImageFromURL,
  deleteLocalFiles,
  isValidURL,
  isImageURL,
} from "./util/util";
import fs from "fs";
import path from "path";

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
  app.get("/filteredimage", async (req, res) => {
    const image_url = req.query.image_url;
    if (!image_url) {
      res.status(400).send({ message: "URL not provided" });
    } else if (!isValidURL(image_url) || !isImageURL(image_url)) {
      res.status(400).send({ message: "Invalid image URL" });
    } else {
      const image = await filterImageFromURL(image_url);
      if (image) {
        res.status(200).sendFile(image, (err) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          }
          const directoryPath = path.join(__dirname, "/util/tmp");

          fs.readdir(directoryPath, function (err, files) {
            if (err) {
              res.status(400).send({ "error messag": err });
            } else {
              deleteLocalFiles(files.map((file) => directoryPath + "/" + file));
            }
          });
        });
      }
    }
  });
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
