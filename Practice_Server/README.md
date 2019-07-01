# Practice Server

PracticeServer is a simple Node.JS server meant to teach concepts such as installing packages and dependencies.

## Getting Started

You will want to start by download a copy of Udagram and installing the necessary programs. See the Prerequisites docs for
more information on the dependencies.

### Prerequisites

The server is dependent on Nodejs and Node Package Manager. 
* Installation instructions can be found [here](https://nodejs.org/en/download/)
* To test if Nodejs is installed, execute the following code in your terminal: `npm -v`

We can issue and save requests to the server with ease using Postman. 
* Installation instruction can be found [here](https://www.getpostman.com/downloads/).

### Installing

A step by step series of examples that tell you how to get a development env running

Once you have Node and Postman installed, you are ready to start up a local server.
* Open a terminal
* Navigate to the Practice_Server directory
* Install the dependencies: type the following and press enter `npm install`
* Spin up the server: type the following and press enter `npm run dev`

Now your server is up and running. See the Running the tests docs for more information on testing the server.

## Running the tests

Explain how to run the automated tests for this system

Now you should be ready to interact with your local server using Postman.
* A Postman collection named Practice_Server.postman_collection.json is located in the root directory of Practice_Server.
* Open Postman and close the simple menu that pops up
* Click the Import button located in the top left corner of the app
* Import the postman_collection.json file

You will see a new folder has been added to the collections list on the left.
If you click on the folder, you will be presented with a list of examples and exercises.

To run a single test:
```
* Be sure that your server is running. If not, run the following command `npm run dev`
* Back in Postman, click any of the listed requests on the left side
* Click the blue Send button on the right side
```

For example:
```
* Making a GET request of `http://localhost:8082/` to the server
* Responds with `Welcome to the Cloud!`
```

## Built With

* [Express](https://expressjs.com) framework helps us build our webserver. 
* [body-parser](https://github.com/expressjs/body-parser) helps us parse, remove, and make use of inbound requests.
* [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com) frameworks help us with unit testing.

## Authors
This repo was forked from Udacity's GitHub page as per the assignment
[udacity/cloud-developer](https://github.com/udacity/cloud-developer/tree/master/course-02)
* Udacity Cloud Developer authors: **[Udacity](https://github.com/eddyudacity)** and **[Michele Cavaioni](https://github.com/Udacavs)** for their *initial work*
* Udacity Cloud Developer student: **dSalazar10** for my participation in the exercises

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/dSalazar10/App-Udagram/blob/master/LICENSE) file for details

## Acknowledgments

* Hat tip to [Gabe Ruttner](https://github.com/grutt) for teaching the lesson and providing the instructions to complete the assignments.
