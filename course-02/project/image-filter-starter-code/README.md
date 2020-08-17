# Udagram Image Filtering Microservice

This project is built for Udacity Nanodegree program. This is a simple image filter built
with NodeJS. Given an accessible image URL with the parameters. Request returns an image with the
filters applied. Request is not public and the request should contain an authorization header. Example
request is provided with the postman collection. Total solution is deployed at AWS Elastic Beanstalk.

* Deployed URL: udagram-image-filter-dev.us-east-1.elasticbeanstalk.com

* Example Request: http://udagram-image-filter-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg

(Kindly use the postman request which contains the authorization header)


* Deployment Screenshot: deployment_screenshots/Deployment_screen_shot.PNG

## Build instructions:

* npm install - Build package
* npm run dev - Run the solution
* npm run build - Build the solution
* Configure eb CLI
* eb deploy - Deploy the solution

## Special Build instructions:
The solution was build in Windows OS. If you are building linux or macos please use following build script

`npm run clean && tsc && cp package.json www/package.json && mkdir www/tmp/ && cd www && zip -r Archive.zip . && cd ..`
