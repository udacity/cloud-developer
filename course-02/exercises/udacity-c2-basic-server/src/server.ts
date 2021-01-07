import bodyParser from "body-parser";
import express, { Request, Response, Router } from "express";

import { Car, cars as cars_list } from "./cars";

(async () => {
  const cars: Car[]  = cars_list;

  // Create an express applicaiton
  const app = express();
  // default port to listen
  const port = 8082;

  // use middleware so post bodies
  // are accessable as req.body.{{variable}}
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
      const { name } = req.params;

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
    const { name } = req.query;

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

  // @TODO Add an endpoint to get a list of cars
  // it should be filterable by make with a query paramater
  app.get( "/cars/", ( req: Request, res: Response ) => {
      // destruct our query paramaters
      const { make } = req.query;

      let carsList = cars;

      // if we have an optional query parameter, filter by it
      if (make) {
        carsList = cars.filter((car) => car.make === make);
      }

      // return the resulting list along with 200 success
      res.status(200).send(carsList);
  } );

  // @TODO Add an endpoint to get a specific car
  // it should require model
  // it should fail gracefully if no matching car is found
  app.get( "/cars/:model", ( req: Request, res: Response ) => {
    // destruct our path params
    const { model } = req.params;

    // check to make sure the model is set
    if (!model) {
      // respond with an error if not
      return res.status(400).send(`model is required`);
    }

    // try to find the car by model
    const car = cars.filter((c) => c.model === model);

    // respond not found, if we do not have this model
    if (car && car.length === 0) {
      return res.status(404).send(`car is not found`);
    }

    // return the car with a sucess status code
    res.status(200).send(car);
  } );

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post( "/cars/", ( req: Request, res: Response ) => {

    // destruct our body payload for our variables
    const { make, type, model, cost, id } = req.body;

    // check to make sure all required variables are set
    if (!id || !type || !model || !cost) {
      // respond with an error if not
      return res.status(400)
                .send(`make, type, model, cost, id are required`);
    }

    // create a new car instance
    const newCar: Car = {
      make, type, model, cost, id,
    };

    // add this car to our local variable
    cars.push(newCar);

    // send the complete car object as a response
    // along with 201 - creation success
    res.status(201).send(newCar);
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
