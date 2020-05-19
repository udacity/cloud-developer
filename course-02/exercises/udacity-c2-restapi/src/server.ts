import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';

import { V0MODELS } from './controllers/v0/model.index';

(async () => {
  console.log("Initializing sequelize")
  console.log(`DBName= ${process.env.UD_DB_HOSTNAME}`)

  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  console.log("Initializing sequelize-complete")
  
  const app = express();
  const port = process.env.PORT || 8080; // default port to listen
  
  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    console.log(`Origin = ${req.header('origin')}`)
    if(req.header('origin') && req.header('origin').toLowerCase() === "http://d7iaxala64pno.cloudfront.net") {
      res.header("Access-Control-Allow-Origin", "http://d7iaxala64pno.cloudfront.net");
    }
    else {
      res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    }
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
    // res.send( "Welcome" );
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();