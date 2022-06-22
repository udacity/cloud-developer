import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars, cars as cars_list } from './cars';

(async () => {

    let cars: Car[] = cars_list;

    const app = express();
    const port = 5000;

    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {

        return res.status(200).send(cars);
    });

    app.get("/cars/:id", (req: Request, res: Response) => {

        let { id } = req.params;

        if (!id) {
            return res.status(400).send("Id is required");
        }

        let car = cars.filter(x => x.id == +id);

        if (car.length === 0) {
            return res.status(400).send("No car found with that id");
        }

        return res.status(200).send(car);
    })

    app.post("/", (req: Request, res: Response) => {

        const { make, type, model, cost, id } = req.body;

        if (!make || !type || !model || !cost || !id) {
            return res.status(400).send("Invalid data");
        }

        let newCar: Car = {
            make, type, model, cost, id
        }

        cars.push(newCar)

        return res.status(201).send(newCar);
    });

    app.listen(port, () => {
        console.log("App is running on" + port);
    });
})();

// ***
// # Tasks
// 1. @TODO `./src/server.ts/`
// Add an endpoint to GET a list of cars.

// 2. @TODO `./src/server.ts/`
// Add an endpoint to get a specific car.

// 3. @TODO `./src/server.ts/`
// Add an endpoint to post a new car to our list.

// 4. @TODO `./src/unit-test-examples/units.ts`
// Try creating a method "concat" to concatenate two strings.

// 5. @TODO `./src/unit-test-examples/units.tests.ts`
// Try creating a new describe block for the "concat" method.
