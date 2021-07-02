import express from 'express';
import { Application } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { unlink } from "fs";

let app: Application;

// Init the Express application
app = express();

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

const validator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.query.image_url) {
    res.status(400).send("image_url query parameter is required");
  } else {
    next();
  }
};

app.get("/filteredimage",  validator, async (req, res) => {
  try {
    const pathToFilteredImage: string = await filterImageFromURL(req.query.image_url);
    res.status(200).send(pathToFilteredImage);
    unlink(pathToFilteredImage, console.warn);
  } catch(error) {
    res.status(422).send(`Could not process image. Please try again. ERROR MSG: ${error.message}`);
  }
});

/**************************************************************************** */

//! END @TODO1

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});

export default app;