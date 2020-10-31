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

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars/", (req: Request, res: Response) => {
    let { make } = req.query;

    if (!make) {
      return res.status(200)
        .send(cars);
    }

    let fcars = cars;
    fcars = cars.filter((car) => car.make === make);

    if (fcars.length == 0) {
      return res.status(400)
        .send('no cars found matching that make')
    }

    return res.status(200)
      .send(fcars);
  });

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get( "/cars/:id", ( req: Request, res: Response ) => {
    let { id } = req.query;

    if ( !id ) {
      return res.status(400)
                .send(`car ID is required`);
    }

    const car = cars.filter((car) => car.id == id);

    if ( car && car.length == 0 ) {
      return res.status(400)
                .send('no car found matching that ID')
    }

    return res.status(200)
              .send(car);
  } );

  /// @TODO Add an endpoint to post a new car to our list
  // it should require make, type, model, and cost
  app.post("/cars",
    async (req: Request, res: Response) => {

      const car: Car = req.body;

      if (!car) {
        return res.status(400)
          .send(`car info required`);
      }

      if (!car.make) {
        return res.status(400)
          .send('no car make found in car info');
      } else if (!car.model) {
        return res.status(400)
          .send('no car model found in car info');
      } else if (!car.cost) {
        return res.status(400)
          .send('no car cost found in car info');
      } else if (!car.type) {
        return res.status(400)
          .send('no car type found in car info');
      }

      car.id = cars.length;
      cars.push(car);
      return res.status(200)
        .send('new car added');
    }
  );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();