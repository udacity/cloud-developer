FROM node:12.22.3
RUN mkdir /code
WORKDIR /code

# Copy over project code
COPY package.json /code
RUN npm install
COPY . /code/
EXPOSE 8100