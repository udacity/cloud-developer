import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';
import { parse } from 'path';

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
app.get("/cars", (req: Request, res: Response) => {
  let { make } = req.query;

  let cars_list = cars;

  //filter only if make value is provided
  if(make){
    cars_list = cars.filter(car => car.make === make);
  }

  //check if cars_list is empty
  if(cars_list && cars_list.length === 0){
    return res.status(200)
            .send(`no cars found for ${make}`);
  }

  return res.status(200)
              .send(cars_list);
});

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get("/cars/:id", (req: Request, res: Response) => {
    //destruct to fetch id from paramsters
    let { id } = req.params;

    let cars_list = cars;

    //check if an id has been provided
    if(id){
      cars_list = cars.filter(car => car.id === parseInt(id));
    }

    console.log(cars_list);

    return res.status(200)
              .send(cars_list);
  });

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
app.post("/cars", 
  async(req: Request, res: Response) => {

  // destruct request body to a car object variable 
  let { id, cost, model, type, make} = req.body;

  const new_car : Car = {
    id: id, cost: cost, type: type, make: make, model: model
  };

  // verify if all inputs are provided
  if(!id || !cost || !model || !type || !make){
    return res.status(400)
            .send("all inputs of Car object are not provided");
  }

  // check if an object with the same id exists
  let exist_car = cars;
  
  exist_car = cars.filter(car => car.id === parseInt(id));
  
  if(exist_car.length > 0){
    return res.status(400)
            .send("Car object with this id already exists");
  }

  // add the new car
  cars.push(new_car);

  return res.status(200)
          .send(cars);

  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();