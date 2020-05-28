FROM node:12

WORKDIR /user/src/app

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev"]