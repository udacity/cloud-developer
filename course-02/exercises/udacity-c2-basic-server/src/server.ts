import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

import {Car, cars as cars_list} from './cars';

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

  app.get( "/cars", (req, res) => {
     const {make} = req.query as {make?: string};

     let queriedCars = cars;
     if (make) {
         queriedCars = queriedCars.filter( car => car.make === make);
     }

     return res.status(200).send(queriedCars);
  })

    app.get( "/cars/:id", (req, res) => {
        const {id: rawId} = req.params;

        const id = parseInt(rawId);
        if (isNaN(id)) {
            return res.status(400).send("expected parameter id to be an integer");
        }

        const car = cars[id];

        if (car === undefined) {
            return res.status(400).send("no car found with id " + id);
        }

        return res.status(200).send(car);
    })

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
    app.post( "/cars", (req, res) => {
        const {type, model, cost: rawCost, make, id: rawId} = req.body;

        const missingParams = Object.entries({type, model, cost: rawCost, make})
            .filter( ([key, value]) => value === undefined)
            .map( ([key]) => key);

        if (missingParams.length > 0) {
            return res.status(400)
                .send( "mandatory car fields missing: " + missingParams.join(","))
        }

        const cost = parseFloat(rawCost);
        if (isNaN(cost)) {
            return res.status(400).send("expected cost to be of type number");
        }
        const id = rawId === undefined ? cars.length : parseInt(rawId);

        if (isNaN(id)) {
            return res.status(400).send("expected id to be of type number");
        }

        if (cars[id] !== undefined) {
            return res.status(400).send("a car with id " + id + " exists already");
        }

        const car: Car = {id, type, model, cost, make};
        cars[id] = car;

        return res.status(201).send(car);
    })

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();