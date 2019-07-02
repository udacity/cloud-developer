# RestAPI Server

The RestAPI Server is a nodejs/typescript rest api implemented indesigned to handle two things:
* Authentication using javascript web tokens and emails stored in an AWS Relational Database Service
* Manage image data using AWS Simple Storage Service

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and 
testing purposes. See deployment for notes on how to deploy the project on a live system
* Fork the Udagram repo
* Clone to your computer
* Navigate a terminal to the Practice_Server directory

The server is dependent on Nodejs and Node Package Manager. 
* Installation instructions can be found [here](https://nodejs.org/en/download/)
* To test if Nodejs is installed, execute the following code in your terminal: `npm -v`
* Now that you have node installed, type in the following and press enter `npm run i && npm run dev`
* Now the server is up and running. Great job!

We can issue and save requests to the server with ease using Postman. 
* Installation instruction can be found [here](https://www.getpostman.com/downloads/).

We can interact with our database with ease using Postbird.
* Installation instructions can be found [here](https://github.com/paxa/postbird).


### Prerequisites


### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

You can deploy this server to the cloud using Amazon Web Services. Instructions to sign up can be 
found [here](https://portal.aws.amazon.com/billing/signup#/).

Interfacing with AWS can be done through the terminal, which will require AWS CLI. Installation instructions can
be found [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

* To test if AWS CLI is installed, execute the following code in your terminal: `aws --version`

## Built With

* [Express](https://expressjs.com) framework helps us build our webserver. 
* [body-parser](https://github.com/expressjs/body-parser) helps us parse, remove, and make use of inbound requests.

## Authors
This repo was forked from Udacity's GitHub page as per the assignment
[udacity/cloud-developer](https://github.com/udacity/cloud-developer/tree/master/course-02)
* Udacity Cloud Developer authors: **[Udacity](https://github.com/eddyudacity)** and **[Michele Cavaioni](https://github.com/Udacavs)** for their *initial work*
* Udacity Cloud Developer student: **dSalazar10** for my participation in the exercises

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/dSalazar10/App-Udagram/blob/master/LICENSE) file for details

## Acknowledgments

* Hat tip to [Gabe Ruttner](https://github.com/grutt) for teaching the lesson and providing the instructions to complete the assignments.
