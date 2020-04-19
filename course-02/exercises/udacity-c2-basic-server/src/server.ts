import bodyParser from "body-parser";
import express, {Request, Response, Router} from "express";

import {Car, cars as cars_list} from "./cars";

(async () => {
    const cars: Car[] = cars_list;

    // Create an express application
    const app = express();
    // default port to listen
    const port = 8082;

    // use middleware so post bodies
    // are accessable as req.body.{{variable}}
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
            const {name} = req.params;

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
        const {name} = req.query;

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

            const {name} = req.body;

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

        const {make} = req.query;

        if (make) {
            const payload = cars.filter((car) => car.make === make);
            if (payload.length > 0) {
                return res.status(200).send(payload);
            } else {
                return res.status(204).send();
            }
        }

        return res.status(200).send(cars);
    });

    // @TODO Add an endpoint to get a specific car
    // it should require id
    // it should fail gracefully if no matching car is found
    app.get("/cars/:id", async (req: Request, res: Response) => {
        if (req.params.id) {
            const id: number = Number.parseInt(req.params.id, 10);
            const payload = cars.filter((car) => car.id === id);
            if (payload.length > 0) {
                return res.status(200).send(payload);
            } else {
                return res.status(204).send();
            }
        }

        return res.status(400).send(`id is required`);
    });

    /// @TODO Add an endpoint to post a new car to our list
    // it should require id, type, model, and cost
    app.post("/cars", (req: Request, res: Response) => {
        const newCar: Car = req.body;

        if (!newCar.id ||
            !newCar.type ||
            !newCar.model ||
            !newCar.cost) {
            return res.status(400).send(`new car requires id, type, model, and cost`);
        }
        cars.push(newCar);
        return res.status(201).send(newCar);
    });

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
