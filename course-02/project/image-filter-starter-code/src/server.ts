import express,{Response, Request} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

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
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    res.send("Welcome to Laweezy image filter. Use /filteredimage to filter your image")
  } );
  
  // api endpoint to get filtered image
  app.get('/filteredimage',async (req:Request, res:Response)=>{

    const {image_url} = req.query;
    // if the image url is null or undefined
    if(!image_url){
      // bad request or user error
      return res.status(400).send("Error. image_url is required")
    }
    try{
      const result = await filterImageFromURL(image_url as string);

      res.status(200).sendFile(result,async(err)=>{
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        else{
          await deleteLocalFiles([result]);
        }
      })
    }
    catch(error)
    {
      console.log(error);
      return res.status(500).send("Something went very wrong");
    }

  });
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();