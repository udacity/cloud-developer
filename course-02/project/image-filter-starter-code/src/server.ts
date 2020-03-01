import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
const validUrl = require("valid-url");

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8081;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  app.get("/filteredimage", async (req : Request, res: Response) => {
    const { image_url } = req.query;
    const tempFiles : string[] = []
    if (image_url && validUrl.isUri(image_url))
    {
      try
      {
        let filteredpath: string = await filterImageFromURL(image_url);
        tempFiles.push(filteredpath);
        res.status(200).sendFile(filteredpath, (err: Error) =>
        {
          if (err)
          {
            res.status(500).send({message: "Something went wrong"})
          }
          deleteLocalFiles(tempFiles);
          
        });
        
        
      } catch (err)
      {
        console.log(err)
        res.status(500).send({ message: "Something went wrong" });
      } 
    } else {
      res.status(422).send({message: "image_url is required"});
    }
  });
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
