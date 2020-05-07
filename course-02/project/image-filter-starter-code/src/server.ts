import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  app.get("/filteredimage", async (req: Request, res: Response) => {
    const { image_url } = req.query;

    if (!image_url) {
      return res.status(400)
        .send(`Image url is required to process`);
    }
    try {
      const outputPath = await filterImageFromURL(image_url);
      res.sendFile(outputPath, async (error) => {
        await deleteLocalFiles([outputPath]);
        if (!error) {
          res.status(200);
        }
        res.status(500).send("Some error occured.");
      });
    }
    catch (e) {
      let result = (e as Error).message;
      res.status(500).send(e);
    }
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