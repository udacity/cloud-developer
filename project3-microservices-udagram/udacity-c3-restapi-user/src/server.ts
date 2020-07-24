import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';

import { V0MODELS } from './controllers/v0/model.index';

import { config } from './config/config';

// Sentry: automatically catch errors and provide a stack trace to developers so we can quickly find and fix bugs
import * as Sentry from '@sentry/node';

(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  Sentry.init({ dsn: config.sentry.dsn });

  const app = express();
  const port = process.env.PORT_USER_SERVICE || 8080; // default port to listen
  
  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.cors.access_control_allow_origin);
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
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();