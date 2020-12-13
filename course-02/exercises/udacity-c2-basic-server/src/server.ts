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
    app.get("/cars/:make", async (req, res) => {
        const carMake = req.params && req.params.make ? req.params.make : res.status(400).send(`make of car is required`)
        const filteredCarList = cars_list.filter(car => carMake === car.make)
        return res.status(200).send(filteredCarList)
    })

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
    app.get("/car/:id", async (req, res) => {
        const carId = req.params && req.params.id ? req.params.id : res.status(400).send(`id of car is required`)
        const filteredCar = cars_list.filter(car => carId == car.id)
        return (filteredCar.length === 1) ? res.status(200).send(filteredCar[0]) : res.status(404).send(`car id not found`)
    })

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
    app.post("/car/", async (req, res) => {
        let { make, type, model, cost } = req.body
        if (!make || !type || !model || !cost) {
            return res.status(400).send(`make, type, model, and cost are required`)
        }

        const new_car:Car = {
            id: (cars_list.length + 1), make: make, type: type, model: model, cost: cost
        }

        cars.push(new_car)

        res.status(201).send(new_car)
    })

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
