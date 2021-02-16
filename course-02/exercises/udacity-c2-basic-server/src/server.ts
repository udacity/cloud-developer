import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';

(async () => {
  let cars: Car[] = cars_list;

  //Create an express applicaiton
  const app = express();
  //default port to listen
  const port = 8082;

  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json());

  // Root URI call
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the Cloud!");
  });

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get("/persons/:name",
    (req: Request, res: Response) => {
      let { name } = req.params;

      if (!name) {
        return res.status(400)
          .send(`name is required`);
      }

      return res.status(200)
        .send(`Welcome to the Cloud, ${name}!`);
    });

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get("/persons/", (req: Request, res: Response) => {
    let { name } = req.query;

    if (!name) {
      return res.status(400)
        .send(`name is required`);
    }

    return res.status(200)
      .send(`Welcome to the Cloud, ${name}!`);
  });

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post("/persons",
    async (req: Request, res: Response) => {

      const { name } = req.body;

      if (!name) {
        return res.status(400)
          .send(`name is required`);
      }

      return res.status(200)
        .send(`Welcome to the Cloud, ${name}!`);
    });

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars", async (req: Request, res: Response) => {
    const { make } = req.query;

    if (!make) {
      return res.send(cars);
    } else {
      return res.send(cars.filter(car => car.make === make));
    }
  });

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get("/cars/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        message: 'id is required'
      });
    }
    if (isNaN(+id)) {
      return res.status(400).send({
        message: 'id must be a number'
      });
    }
    const car = cars.find(car => car.id === +id);
    if (car) {
      return res.send(car);
    }

    return res.status(404).send({
      message: `car with id ${id} not found`
    });
  });

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars", async (req: Request, res: Response) => {

    function isCar(car: any): car is Car {
      return car.make && car.type && car.model && car.cost && !isNaN(car.cost) && car.id && !isNaN(car.id);
    }

    const car = req.body;
    if (!car) {
      return res.status(400).send({
        message: 'car information is required'
      });
    }
    if (!isCar(car)) {
      return res.status(400).send({
        message: 'car body must be a car(make, type, mode, cost, id)'
      });
    }
    cars.push(car);
    return res.status(201).send(car);
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();