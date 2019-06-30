# udacity-c2-basic-server

This is a simple node-express server to explore and understand the Request-Response pattern.

***
## Getting Setup

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```
>_tip_: **npm i** is shorthand for **npm install**

### Installing useful tools
#### 1. [Postbird](https://github.com/paxa/postbird)
Postbird is a useful client GUI (graphical user interface) to interact with our provisioned Postgres database. We can establish a remote connection and complete actions like viewing data and changing schema (tables, columns, ect).

#### 2. [Postman](https://www.getpostman.com/downloads/)
Postman is a useful tool to issue and save requests. Postman can create GET, PUT, POST, etc. requests complete with bodies. It can also be used to test endpoints automatically. We've included a collection (`./udacity-c2-restapi.postman_collection.json `) which contains example requsts.

***

## Running the Server Locally
To run the server locally in developer mode, open terminal and run:
```bash
npm run dev
```

Developer mode runs off the TypeScript source. Any saves will reset the server and run the latest version of the codebase. 

***
## Important Files and Project Structure

The source code for this demo resides in the ./src directory.

### src/server.ts
The main code for this demo is located in the ./src/server.ts file. This includes 

### src/cars.ts
This is a javascript object containing a list of cars. This will be useful for providing data for our simple endpoints.

### src/unit-test-examples/
This directory contains some simple unit functions (`units.ts`) and corresponding tests using Mocha and Chai (`units.tests.ts`).

***
# Tasks
1. @TODO `./src/server.ts/`
Add an endpoint to GET a list of cars.

2. @TODO `./src/server.ts/` 
Add an endpoint to get a specific car.

3. @TODO `./src/server.ts/` 
Add an endpoint to post a new car to our list.

4. @TODO `./src/unit-test-examples/units.ts`
Try creating a method "concat" to concatenate two strings.

5. @TODO `./src/unit-test-examples/units.tests.ts`
Try creating a new describe block for the "concat" method.
