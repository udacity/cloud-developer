import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars:Car[] = cars_list;

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

  // (C)   POST: Endpoint to Create a car item in our list of cars
  app.post("/cars/", (req: Request, res: Response) => {
    let {make, type, model, cost} = req.body;

    if (!make || !type || !model || !cost) {
      return res.status(400).send("Invalid Request");
    }

    const car:Car = {make:make, type:type, model:model, cost:cost, id:cars.length};
    cars.push(car);
    return res.status(201).send(car.id.toString());
  });

  // (R)    GET: Endpoint to Retrieve a car or list of cars
  app.get( "/cars/", ( req: Request, res: Response ) => {
    let { make } = req.query;

    if (!make) {
      return res.status(200).send(cars);
    }

  return res.status(200).send(
      cars.filter((car) => car.make == make)
    );
  });

  app.get( "/cars/:id", 
    ( req: Request, res: Response ) => {
      let { id } = req.params;
      let carId:number = +id;
      let specificCar = cars[carId];
      if (specificCar) {
        return res.status(200).send(specificCar);
      }
      
      return res.status(404).send("Invalid Car ID");
  });

  // (U)    PUT: Endpoint to Update a car in our list of cars

  // (D) DELETE: Endpoint to Delete a car from our list of cars

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();