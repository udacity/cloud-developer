import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';
import { isUndefined } from 'util';

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
  app.get( "/cars/",
    async (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      const { make } = req.query;
      console.log(make);
      let cars_to_return:Car[] = [];
      if ( make ) {
        cars_to_return = cars_list.filter( (car) => car.make === make );
      } else {
        cars_to_return = cars_list;
      }
      return res.status(200).send(JSON.stringify(cars_to_return));
    });

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get( "/cars/:id", 
    async (req: Request, res: Response) => {
      const { id } = req.params;
      let comp_id:number = id;
      console.log("With ID " + id);
      let selected_car = cars_list.filter( car => car.id == id);
      if (selected_car == undefined || selected_car == null || selected_car.length == 0) {
        return res.status(404).send("No car with id " + id + " found.");
      }
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(JSON.stringify(selected_car[0]));
    });

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
    app.post("/cars", async (req:Request, res:Response) => {
      console.log(req.body);
      const  car  = req.body;
      console.log(car); 
      if ( car == undefined || car == null ) {
        return res.status(400).send("Erronous input. No valid car structure found.");
      }
      if ( car.id == undefined || car.id == null) {
        return res.status(400).send("Erronous input. No valid Id provided.");
      }
      let existing_car:Car = cars_list.find( c => c.id == car.id );
      if (existing_car != undefined || existing_car != null) {
        return res.status(400).send("Erronous input. Car with ID " + car.id + " already exists.");
      }
      cars_list.push(car);
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(JSON.stringify(car));
    });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();