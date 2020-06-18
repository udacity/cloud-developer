import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import fetch from "node-fetch";

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
  const isValid = async (url: string): Promise<boolean> => {
    try {
      console.log(`Check this value ${url}`);
      //create instance of URL from parameter
      const imageURL = new URL(url);
      //fetch data from url
      const response = await fetch(imageURL);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error(`${error} from isValid`);
    }
    return false;
  };
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  app.get("/filteredimage", async (req, res) => {
    const { image_url } = req.query;
    console.log(image_url);
    if (!(await isValid(image_url))) {
      res.status(404).send("url is not valid");
    }
    const responseFile = await filterImageFromURL(image_url);
    res.status(200).sendFile(responseFile, () => {
      deleteLocalFiles([responseFile]);
    });
  });
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

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
