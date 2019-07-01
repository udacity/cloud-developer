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

  // it should be filterable by make with a query parameter
  app.get( "/cars/", ( req: Request, res: Response ) => {
      const { make } = req.query;
      let listOfCars = cars;
      if (make) {
          listOfCars = cars.filter( (car) => car.make === make );
      }
      return res.status(200).send(listOfCars);
  });

  // it should require id
  // it should fail gracefully if no matching car is found
  app.get( "/cars/:id", ( req: Request, res: Response ) => {
      const { id } = req.params;
      if ( !id ) {
          return res.status(400).send(`id is required`);
      }
      // tslint:disable-next-line:triple-equals
      const carID = cars.filter( (car) => car.id == id);
      if ( carID && carID.length === 0 ) {
          res.status(404).send(`car not found for id: ${id}`);
      }
      return res.status(200).send(carID);
  });

  // Post a new car to our list; it should require id, type, model, and cost
  app.post( "/cars", async ( req: Request, res: Response ) => {
      const { make, type, model, cost, id } = req.body;
      if (!id || !type || !model || !cost) {
          return res.status(400).send(`make, type, model, cost, id are required`);
      }
      const newCar: Car = {
          // tslint:disable-next-line:object-literal-sort-keys
          make, type, model, cost, id,
      };
      cars.push(newCar);
      res.status(201).send(newCar);
  });

  // Get a list of cars by make and sort order
  // it should require a make and a sort type
  app.get( "/cars/:make?sort", (req: Request, res: Response) => {
      const { make } = req.params;
      const { sort } = req.query;
      if ( !make && !sort) {
          return res.status(400).send(`make and sort are required`);
      }
      const priceSortedCars = cars.filter( (car) => car.make === make);
      if ( priceSortedCars && priceSortedCars.length === 0 ) {
          return res.status(400).send(`car not found for make ${make}`);
      }
      priceSortedCars.sort( (a, b) => (b.cost < a.cost) ? (1) : ( (b.cost > a.cost) ? (-1) : (0) ));
      return res.status(200).send(priceSortedCars);
  });

  // PATCH update to a specific car
  app.patch( "/cars/:id", (req: Request, res: Response) => {
      const { id } = req.params;
      const { make, type, model, cost } = req.body;
      if ( !id ) {
          return res.status(400).send(`id is required.`);
      }

      if ( !type || !model || !cost ) {
          return res.status(400).send(`make, type, model, cost, id are required`);
      }
      // tslint:disable-next-line:triple-equals
      const sortedCars = cars.filter( (car) => car.id == id);
      if ( sortedCars && sortedCars.length === 0 ) {
          return res.status(400).send(`car not found for make ${make}`);
      }
      // tslint:disable-next-line:triple-equals
      const index: number = cars.findIndex((patchCar) => patchCar.id == id);
      const updatedCar = cars[index];
      updatedCar.type = type;
      updatedCar.model = model;
      updatedCar.cost = cost;
      return res.status(200).send(updatedCar);
  });

  // DELETE remove a specific car
  app.delete( "/cars/:id", ( req: Request, res: Response ) => {
    const { id } = req.params;
    if ( !id ) {
        return res.status(400).send(`id is required`);
    }
    // tslint:disable-next-line:triple-equals
    const carID = cars.filter( (car) => car.id == id);
    if ( carID && carID.length === 0 ) {
        res.status(404).send(`car not found for id: ${id}`);
    }
      // tslint:disable-next-line:triple-equals
    const index: number = cars.findIndex((c) => c.id == id);
    if (index > -1) {
        cars.splice(index, 1);
    }
    return res.status(204).send();
  });

  // Start the Server
  app.listen( port, () => {
      // tslint:disable-next-line:no-console
      console.log( `server running http://localhost:${ port }` );
      // tslint:disable-next-line:no-console
      console.log( `press CTRL+C to stop server` );
  });

})();
