# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed along side the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/grutt/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. 
2. [The RestAPI Backend](https://github.com/grutt/udacity-c2-restapi)
Which is a Node-Express server which can be deployed to a cloud service.
3. [The Image Filtering Microservice](https://github.com/grutt/udacity-c2-image-filter) `This Repo`
Which is the final project for the course. It is a Node-Express application which runs a simple Python script to process images.

##Tasks
### Setup Python Enviornment
You'll need to set up and use a virtual environment for this project.

To create a virtual enviornment run the following from within the project directory:
1. Install virtualenv dependency: `pip install virtualenv`
2. Create a virtual enviornment:    `virtualenv venv`
3. Activate the virtual enviornment: `source venv/bin/activate` (Note: You'll need to do this every time you open a new terminal)
4. Install dependencies: `pip instal -r requirements.txt`

Whe you're done working and leave the virual enviornment, run: `deactivate`

### Setup Node Enviornment
You'll need to create a new node server. Open a new terminal within the project directory and run:
1. Initialize a new project: `npm init`
2. Install express: `npm i express --save`
3. Install typescript dependencies: `npm i ts-node-dev tslint typescript  @types/bluebird @types/express @types/node --save-dev`
4. Look at the `package.json` file from the RestAPI repo and copy the `scripts` block into the auto generated `package.json` in this project. This will allow you to use shorthand commands like `npm run dev`

### Create a new server.ts file
Use our basic server as an example to set up this file. For this project it's ok to keep all of your business logic in the one server.ts file, but you can try to use feature directories and app.use routing if you're up for it. Use the RestAPI structure to guide you.

### Add an endpoint to handle POST imagetoprocess requests
It should accept two POST parameter:
>    image_url: string - a public url of a valid image file

>    upload_image_signedUrl: string (OPTIONAL) - a url which will allow a PUT request with the processed image
    
It should respond with 422 unprocessable if either POST parameter are invalid.

It should require a token in the Auth Header or respond with 401 unauthorized.

> The matching token should be saved as an enviornment variable
    
> (TIP we broke this out into its own auth.router before, but you can access headers as part of the req.headers within your endpoint block)

It should respond with the image as the body if upload_image_signedUrl is included in the request.

It should respond with a success message if if upload_image_signedUrl is NOT included in the request.


### Refactor your restapi server
#### Add a request to the image-filter server within the RestAPI POST feed endpoint

It should create new SignedURLs required for the imagetoprocess POST Request body.

It should include a POST request to the new server (TIP keep the server address and token as enviornment variables).

It should overwrite the image in the bucket with the filtered image (in other words, it will have the same filename in S3).


### Deploying your system!
Follow the process described in the course to `eb init` a new application and `eb create` a new enviornment to deploy your image-filter service!


## Stand Out
#### Postman Integration Tests
Try writing a postman collection to test your endpoint. Be sure to cover:
> POST requests with and without tokens
> POST requests with valid and invalid parameter

#### Refactor Data Models
Try adding another column to your tables to save a separate key for your filtered image. Remember, you'll have to rename the file before adding it to S3!

#### (ADVANCED) Refactor Data Models
Try adding a second OpenCV filter script and add an addtional parameter to select which filter to use as a POST parameter

