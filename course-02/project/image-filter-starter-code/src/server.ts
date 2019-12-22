import express from 'express';
import urlExists from 'url-exists';
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

  //testing url
  //http://localhost:8082/filteredimage?image_url=https://homepages.cae.wisc.edu/~ece533/images/airplane.png
  //http://localhost:{{PORT}}/filteredimage?image_url=https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg

  app.get("/filteredimage", async ( req, res) => {
    const image_url = req.query.image_url;

    const promise = new Promise((resolve, reject) => {
        urlExists(image_url, function(err, exists) {
        console.log(exists)
        resolve(exists)
    
       }); })

      promise.catch(err => error_handler(err,res)).then(is_vlaid => filter_handler(image_url,is_vlaid,res))
           
           
   
  } );


async function error_handler(err,res){
   console.log("error"+err)
  return res.status(400).send({
               message: "The image url does not exist or is malformed"
                });
}


//few questions, will it matter if i use return with res.status
// and what's the diffrence betwen  res.status and res.sendStaus
//when I used the latter i faced and error UnhandledPromiseRejectionWarning: Error: Can't set headers after they are sent.
async function filter_handler(image_url, is_valid, res){


             if(!is_valid) 
               return res.status(400).send({
               message: "The image url does not exist or is malformed"
                });
           else{
              try{
    
                const filteredImage = await filterImageFromURL(image_url);
                res.sendFile(filteredImage, () =>
                deleteLocalFiles([filteredImage])
                   );

                  }

              catch (error){
                 return res.status(400).send({
                  message: "something went wrong while processing image url, please make sure the url points to an image"
                  });
               }
               }

}
 
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();