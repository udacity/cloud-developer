## Build
FROM beevelop/ionic AS ionic
# Create the application directory
WORKDIR /usr/src/app
# Install the application dependencies
# We can use wildcard to ensure both package.json AND package-lock.json are considered
# where available (npm@5+)
COPY package*.json ./
RUN npm ci
# Bundle app source
COPY . .
RUN ionic build

## Run 
FROM nginx:alpine
#COPY www /usr/share/nginx/html
COPY --from=ionic /usr/src/app/www /usr/share/nginx/html