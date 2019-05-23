import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';

(async () => {

  const app = express();
  const port = 8082; // default port to listen
  
  app.use(bodyParser.json());
  
  //VERY BAD
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Root URI call
  app.get( "/", async ( req, res ) => {
    const pythonProcess = spawn('python3', ["src/image_filter.py"]);
    if(pythonProcess !== undefined) {
      pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString())
      });
    }

    res.send( "pythonic" );
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();