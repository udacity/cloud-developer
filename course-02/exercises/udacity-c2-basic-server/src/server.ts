import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  app.get("/cars/", (req: Request, res: Response) => {
    let { make } = req.query;
    let results = cars;

    if (make) {
      results = cars.filter((c) => { 
        return c.make === make;
      });
    }

    return res.status(200).send(results);
  });

  app.get("/cars/:id",
    async (req: Request, res: Response) => {
      let { id } = req.params;

      let result = cars.find((c) => {
        return c.id === Number(id);
      });

      if (!result) {
        return res.status(404).send('That car can\'t be found');
      }

      return res.status(200).send(result);
    });

  app.post("/cars/",
    async (req: Request, res: Response) => {
      const { id, type, model, cost, make } = req.body;

      if (!id || ! type || !model || !cost || !make) {
        return res.status(400)
          .send(`Make sure to send all required fields: id, type, model, cost, make`);
      }
      const new_car: Car = {
        id: id,
        type: type,
        model: model,
        make: make,
        cost: cost
      };
      
      cars.push(new_car);

      return res.status(201)
        .send(`Created car!`);
    });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
  module.exports = app;
})();