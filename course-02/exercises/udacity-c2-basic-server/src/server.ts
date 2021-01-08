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

app.get('/cars', (req: Request, res: Response) => {
  const { make } = req.query;
  let results = cars_list;
  if (make) {
    results = cars_list.filter((car) => car.make === make);
  }
  res.status(200).json(results);
});

  app.get('/cars/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let results = cars_list;
    if (!id) {
      return res.status(400).send('id is required')
    }
    if (id) {
      results = cars_list.filter((car) => { return car.id == id; })
      if (results.length) {
        return res.status(200).json(results[0]);
      } else {
        return res.status(404).send('Not found')
      }
    }    
  });  

  app.post('/cars', (req: Request, res: Response) => {
    const { id, make, type, model, cost } = req.body;
    if (!id || !type || !model || !cost) {
      res.status(500).json('must include make, type, model, and cost')
    } else {
      const car = { make, type, model, cost, id }
      cars.push(car)
      res.status(201).json(car);
    }
  });    

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();