# Udagram REST API

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:

1. [The Simple Frontend](../udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend.
2. [The RestAPI Backend](.), a Node-Express server which can be deployed to a cloud service.
3. [The Image Filtering Microservice](../../../project2-image-filter), the final project for the course. It is a Node-Express application which runs a simple script to process images.

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

Postman is a useful tool to issue and save requests. Postman can create GET, PUT, POST, etc. requests complete with bodies. It can also be used to test endpoints automatically. We've included a collection (`./udacity-c2-restapi.postman_collection.json`) which contains example requsts.

***

## Running the Server Locally

To run the server locally in developer mode, open terminal and run:

```bash
npm run dev
```

Developer mode runs off the TypeScript source. Any saves will reset the server and run the latest version of the codebase.

***

## Build & run docker image

### Build your image

`docker build -t {dockerid}/udacity-restapi-feed .`
Replace {dockerid} with your docker user's id.
The -t flag lets you tag your image so it's easier to find later using the docker images command.

### Run your image

`docker run --rm --publish 8080:8080 -v "%userprofile%\.aws:/root/.aws" --env DB_USERNAME=%DB_USERNAME% --env DB_PASSWORD=%DB_PASSWORD% --env DB_NAME=%DB_NAME% --env DB_HOST=%DB_HOST% --env AWS_REGION=%AWS_REGION% --env AWS_PROFILE=%AWS_PROFILE% --env AWS_MEDIA_BUCKET=%AWS_MEDIA_BUCKET% --env AWS_ACCESS_KEY_ID=%AWS_ACCESS_KEY_ID% --env AWS_SECRET_ACCESS_KEY=%AWS_SECRET_ACCESS_KEY% --env JWT_SECRET=%JWT_SECRET% --env ACCESS_CONTROL_ALLOW_ORIGIN=%ACCESS_CONTROL_ALLOW_ORIGIN% --env SENTRY_DNS=%SENTRY_DNS% --env IMAGEFILTER_SENTRY_DNS=%IMAGEFILTER_SENTRY_DNS% --env IMAGEFILTER_MORGAN_FORMAT="%IMAGEFILTER_MORGAN_FORMAT%" --env SENTRY_DNS_FEED=%SENTRY_DNS_FEED% --env SENTRY_DNS_USER=%SENTRY_DNS_USER% --env PORT_FEED_SERVICE=8080 --env PORT_USER_SERVICE=8080 --name feed kendyjm/udacity-restapi-feed`
