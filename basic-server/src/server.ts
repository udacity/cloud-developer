import express, { Router, Request, Response } from 'express';
import bodyParser                             from 'body-parser';
import { Car, cars as cars_list }             from './cars';

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
  app.get("/persons/:name", (req: Request, res: Response) => {
    const { name } = req.params;
    if (!name) return res.status(400).send(`name is required`);
    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get("/persons/", (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name) return res.status(400).send(`name is required`);
    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post("/persons", async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).send(`name is required`);
    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });


  // GET all of the cars:
  app.get('/cars/', async (req: Request, res: Response) => {
    return res.status(200).send(cars);
  })

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get('/cars/:make', async (req: Request, res: Response) => {
    const { make } = req.params;
    const carsToShow: Car[] = cars.filter(car => ( car.make.toLowerCase() === make.toLowerCase() ));
    const carNumber: number = carsToShow.length;
    if (carNumber) {
      const manufacturer = make[0].toUpperCase() + make.slice(1);
      const responseMsg = `The number of cars from manufacturer ${manufacturer}: ${carNumber}`;
      return res.status(200).send(responseMsg);
    } else {
      return res.status(400).send('No car with this type!');
    }
  });

  // @TODO Add an endpoint to GET a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get('/carid/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const carsToShow: Car[] = cars.filter(car => car.id === Number(id));
    const car = JSON.stringify(carsToShow[0]);
    if (car) {
      return res.status(200).send(`The car you requested is: ${car}`);
    } else {
     return res.status(400).send('No car with this id!');
    }
  });

  /// @TODO Add an endpoint to POST a new car to our list
  // it should require id, type, model, and cost
  app.post("/newcar", async (req: Request, res: Response) => {
    const carsNumber = cars.length; 
    const newCar: Car = req.body;
    const newCarProperties: string[] = Object.keys(newCar);

    const preReqs: string[] = ["make", "type", "model", "cost"];
    const isValid: boolean = preReqs.every(preReq => newCarProperties.includes(preReq));

    if (isValid) {
      newCar.id = cars.length;
      cars.push(newCar);
      return res.status(200).send(`${JSON.stringify(newCar)} is added`);
    } else {
      return res.status(400).send('Invalid parameters for the car!');
    }
  });

  // Start the Server
  app.listen(port, () => {
      console.log(`server running http://localhost:${ port }`);
      console.log(`press CTRL+C to stop server`);
  });
})();
