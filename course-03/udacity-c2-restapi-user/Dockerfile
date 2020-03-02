# Set the base image
FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Copy package.json AND package-lock.json
COPY package*.json ./

# Copy the rest of the code
COPY . .

# Install all dependencies
RUN npm ci 

# Expose the port 
EXPOSE 8080
# Define the command that should be executed
CMD [ "npm", "run", "dev" ]