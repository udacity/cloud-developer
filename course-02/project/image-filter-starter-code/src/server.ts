import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

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

  app.get("/filteredimage", async (req: Request, res: Response) => {
    let { image_url } = req.query;

    if (!image_url) {
      return res.status(400).send(`The image URL is required`);
    }

    filterImageFromURL(image_url)
      .then((data) => handleResponse(res, data))
      .catch(() => handleError(res, image_url));
  });

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

  /**
   * Handles the successful http response
   * @param res the http response
   * @param filePath the temporary file path
   * @returns the http response containing the resized image
   */
  function handleResponse(res: express.Response, filePath: any) {
    return res.sendFile(filePath, function () {
      //delete the temporary image after sending the response to the client
      deleteLocalFiles(filePath);
    });
  }

  /**
   * Handles the http response in case of error
   * @param res the http response
   * @param image_url the initial image_url provided by the client
   * @returns an http containing an error message
   */
  function handleError(res: express.Response, image_url: string) {
    return res
      .status(500)
      .send({ error: "Error at retrieving image from URL: " + image_url });
  }
})();
