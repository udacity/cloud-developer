# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course]
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [Your assignment]

## Tasks

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

## Stand Out (Optional)

### Refactor the course RESTapi

If you're feeling up to it, refactor the course RESTapi to make a request to your newly provisioned image server.

### Authentication

Prevent requests without valid authentication headers.
> !!NOTE if you choose to submit this, make sure to add the token to the postman collection and export the postman collection file to your submission so we can review!

### Custom Domain Name

Add your own domain name and have it point to the running services (try adding a subdomain name to point to the processing server)
> !NOTE: Domain names are not included in AWS’ free tier and will incur a cost.

# PROJECT SPECIFICATION: Engineering Full Stack Apps in the Cloud

## Engineering Process and Quality
The project demonstrates an understanding of a good cloud git process
[![deployementserver1](assets\Branches.PNG)](https://github.com/racheen/cloud-developer/blob/master/course-02/project/image-filter-starter-code/assets/Branches.PNG)

## Development Server
Starting the server with npm run dev runs a local instance of the server with no errors
[![deployementserver1](/assets\DeployementServer1.PNG)](https://github.com/racheen/cloud-developer/blob/master/course-02/project/image-filter-starter-code/assets/DeployementServer1.PNG)

The stubbed @TODO1 endpoint in src/server.ts is completed and accepts valid requests including:

http://udagram-rache-ifilter-dev-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://thumbs-prod.si-cdn.com/d4e3zqOM5KUq8m0m-AFVxuqa5ZM=/800x600/filters:no_upscale():focal(554x699:555x700)/https://public-media.si-cdn.com/filer/a4/04/a404c799-7118-459a-8de4-89e4a44b124f/img_1317.jpg
![deployementserver2](/assets\DeployementServer2.PNG)

Successful responses have a 200 code, at least one error code for caught errors

![deployementserver3](/assets\DeployementServer3.PNG)
![deployementserver3](/assets\DeployementServer4.PNG)

## Elastic Beanstalk Deployment
A screenshot of the elastic beanstalk application dashboard is included in a [`deployment_screenshot`](https://github.com/racheen/cloud-developer/tree/master/course-02/project/image-filter-starter-code/deployment_screenshots/elastic_beanstalk_sc.PNG) directory

![deployment_screenshot](/deployment_screenshots\elastic_beanstalk_sc.PNG)

An endpoint URL for a running elastic beanstalk deployment: 
udagram-rache-ifilter-dev-dev.us-east-1.elasticbeanstalk.com
