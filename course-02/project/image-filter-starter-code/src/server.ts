import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

 
  app.get("/filteredImage", async (req: Request, res: Response) => {
    const { image_url }: { image_url: string } = req.query;

    //1. validate the image_url query
    if (!image_url) {
      return res.status(400).send("Bad Request: Please provide image url");
    }

    //call filterImageFromURL(image_url) to filter the image
    filterImageFromURL(image_url).then(imagePath => {
      //send the resulting file in the response
      res.status(200).sendFile(imagePath, err => { 
        if (err) {
          return res.status(400).send(err.message);
        } else {
          //deletes any files on the server on finish of the response
          deleteLocalFiles([imagePath]);
        }
      })
    }).catch(err => res.status(422).send({message: `${err.message ? err.message : "An error occured"}`}))
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