#building a nodejs image
FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
#install all packages
RUN npm ci 
# Bundle app source
#we install the rest of the source code.
COPY . . 
#our app will run on this port 8080
EXPOSE 8080
#we define these commands npm, run, prod which should be executed to run inside our container.
CMD [ "npm", "run", "prod" ]

#this file enables us to package up our app inside an image.