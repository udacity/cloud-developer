import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import ErrorHandler from "./ErrorHandler";

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

  //! END @TODO1

  app.get("/filteredimage", async (request: Request, response: Response, next: NextFunction) => {
    const imageUrl: string = request.query["image_url"];
    if (!imageUrl) {
      next(new ErrorHandler(400, "No Image URL provided."));
    }

    try {
      new URL(imageUrl);
    } catch (error) {
      next(new ErrorHandler(400, "Invalid URL provided."));
    }

    try {
      const filtered: string = await filterImageFromURL(imageUrl);

      return response.sendFile(filtered, async () => {
        await deleteLocalFiles([filtered]);
      });
    } catch (error) {
      next(new ErrorHandler(422, "Unable to process the image provided by the URL."));
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (request: Request, response: Response) => {
    response.send("try GET /filteredimage?image_url={{}}");
  });

  app.use((error: ErrorHandler, request: Request, response: Response, next: NextFunction) => {
    return response.status(error.statusCode || 500).json({
      status: "An Error Occurred.",
      message: error.message,
      statusCode: error.statusCode,
    });
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
