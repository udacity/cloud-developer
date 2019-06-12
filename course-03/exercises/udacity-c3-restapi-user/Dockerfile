FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "dev" ]
# changes: I simplified the copying of files and changed the CMD to npm run dev for now, seems more stable
# status: locally it runs, but when packaged in a container both dev and prod throw errors that are sequelize configuration related
