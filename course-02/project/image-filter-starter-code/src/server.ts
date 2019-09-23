import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();
  
  // Set the network port
  const port = process.env.PORT || 8082;
     //correct !
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

  /*
  app.get( "/:id", async ( req, res ) => {
   const id = req.params.id;
    console.log(id);
   // let {image_url}= req.params.image_url;
   // console.log(image_url);
    //let {absPath} = filterImageFromURL(image_url);
    //res.writeHead

    res.status(200).send("\""+req.params.id +"\" Request was received !");
    // res.sendFile( await filterImageFromURL(image_url));
    //res.send("try GET /filteredimage?image_url="+filterImageFromURL(image_url)+"")
  } );
*/
let  files: Array<string>=[];
  app.get( "/filteredimage/", async ( req, res ) => {
  
    let{image_url} = req.query; 
    if(!image_url){
     return res.status(400).send('image url is required');
   }
   else {
   const imageF= await filterImageFromURL(image_url);
   files.push(imageF);//
  //  console.log("files.pop() "+files.pop());
    res.sendFile(imageF);

    
    res.on('finish', function() {
      res.status(500).end();
      if(files.length<1){
        console.log('Files Array is empty');
      }else{deleteLocalFiles(files);
     const temp= files.pop();}
      
    });

  
  
  /*
   res.once('end', () => {
    deleteLocalFiles(files);
    
  });
      res.emit('end');
    */
 

   
} 
  } );


  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );

 
  
})();


