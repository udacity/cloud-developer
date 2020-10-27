# This project serve as fork of Udacity's Cloud Developer Nanodegree

The folder structure is the same as Udacity's.
The `course-02` folder contains exercises - all deployed on AWS - such as:
- A frontend application in Ionic;
- A NodeJS server;
- And a NodeJS project to filter images (Instagram on AWS).

## Instagram Project on AWS

Project resides in `course-02/project/image-filter-starter code`.

The URL of the project is `http://instagram-on-aws-dev2.us-east-2.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg`.

The image of the running instance can be found in
`deployment_screenshots` directory.

## Refactor Udagram App into Microservices and Deploy

This project is a continuation of *Instagram Project on AWS*, where the monolith app has been restructured into separable pieces such as a frontend, restapi-feed, restapi-user. And for better handling, it was taken advantage of docker for building images, Kubernetes for container deployment, and continuous integration with Travis CI.

Since this is a continuation, the project resides in  `course-02/exercises`.

The images of the project running are at `course-02/project/refactor-into-microservices-and-deploy`.

The Docker images are available in (make sure you have an account to be able to see it):
- https://hub.docker.com/repository/docker/andersonlando/udacity-frontend
- https://hub.docker.com/repository/docker/andersonlando/udacity-restapi-user
- https://hub.docker.com/repository/docker/andersonlando/reverseproxy
- https://hub.docker.com/r/andersonlando/udacity-restapi-feed