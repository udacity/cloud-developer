import express from 'express';
import bodyParser from 'body-parser';
import {Request,Response,Router} from 'express';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();
  const urlExist = require("url-exists"); 
  const util = require('util');
  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  
app.get("/filteredimage/",async(req:Request,res:Response)=>{
  
    const image_url=req.query.image_url;
    console.log("image_url--->"+image_url);
    if(!image_url){
      return res.status(400).send("please send image url")
    }

const urlExists = util.promisify(urlExist);
//check if url is available if not return error
let isExists = await urlExists(image_url);
if(!isExists){
  return res.status(400).send("url not present");
}

//processing the image if url is present
let processedImage:string= await filterImageFromURL(image_url);
 res.sendFile(processedImage,function(err){
   if(!err){
      let imageTobeDeleted=new Array;
      imageTobeDeleted[0]=processedImage;
      console.log("first item*******"+imageTobeDeleted[0]);
     deleteLocalFiles(imageTobeDeleted); 
   }
 });
  

  });
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
