import express from 'express';
import { sequelize } from './sequelize';
import { IndexRouter } from './controllers/v0/index.router';
import bodyParser from 'body-parser';
import { V0MODELS } from './controllers/v0/model.index';
import { logger }  from './utils/logger';


(async () => {
  try {
    await sequelize.addModels(V0MODELS);
    await sequelize.sync();
  } catch (e) {
    logger.error(e);
    // TODO: Improve error handling
    throw(e);
  }

  const app = express();
  const port = process.env.PORT || 8080; // default port to listen
  
  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100/api/v0");
    // res.header("Access-Control-Allow-Origin", "https://udagram-ramin-frontend.s3.eu-west-2.amazonaws.com/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
  } );
  

  // Start the Server
  app.listen( port, () => {
    console.log( `Server runnning on ${ port }` );
  });
})();