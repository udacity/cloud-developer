#Base image for the container
FROM node:current-alpine

#Install GIT, GnuPG
RUN apk update && apk add git gnupg bash

#Add necessary utilities
RUN apk add \
    unzip \
    vim \
    curl \
    gcc \
    python3

WORKDIR /home/node/app

RUN curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
RUN unzip awscli-bundle.zip
RUN python3 ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
    
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm --save install ts-node-dev
RUN npm install

#Add ionic3
#RUN npm install -g @ionic/cli

USER node
RUN mkdir ../.aws
