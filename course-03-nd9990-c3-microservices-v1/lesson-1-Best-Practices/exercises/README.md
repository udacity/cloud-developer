## Lesson 1 - Best Practices for Micro-Services Development
The exercises in this lesson are an extension of the exercises you have already done in the previous course - **"Full Stack Apps on AWS"**.  We will use the same "Udagram" project to perform the tasks as mentioned in the project instructions. 

### Prerequisite
Before we get started, confirm that you have installed NodeJs, npm and Ionic Framework by checking the versions:
```bash
node --version
npm --version
ionic --version
```

If you get a `not found` message, install the required item:
*   [Ionic CLI](https://ionicframework.com/docs/installation/cli) if you don't already have it installed
*  [Nodejs and npm](https://nodejs.org/en/download/) 


## Exercise Instructions
Perform the following tasks in the sequence mentioned below:

### Task 1 - Clone the project GitHub repository 
Clone the [course repo](https://github.com/scheeles/cloud-developer) and stay on the `master` branch.

```bash
git clone https://github.com/udacity/nd9990-c3-microservices-v1
cd nd9990-c3-microservices-v1/
git branch
```
Navigate to the `/lesson-1-Best-Practices/exercises/` directory.


#### Task 2 - Set the User-specific environment variables
For this server to work you'll need to access the AWS RDS database and S3 bucket that you set up in the Full  Stack App on AWS Course.  Make sure that the RDS instance is running and that you have defined all of the environment variables in your `./profile` file that is called in the `config.ts`:
```bash
POSTGRESS_USERNAME
POSTGRESS_PASSWORD
POSTGRESS_DB
POSTGRESS_HOST
AWS_REGION
AWS_PROFILE
AWS_BUCKET
JWT_SECRET
```

If you need a refresher on how to do this, see the [Handling Secrets with Environment Variables lesson](https://classroom.udacity.com/nanodegrees/nd9990/parts/5d4b2317-8333-47b3-a9ec-ea2cf0a3efbb/modules/ab95831d-3105-400e-9c49-01a9d85e5a65/lessons/9bab122b-1f83-461f-b4dc-f167ab2e9072/concepts/5e27708d-263c-422d-bc56-d4b867691b56 ). 

##### Steps to store the environment variables in `.profile` file
Create (if not exists) a `.profile` file in `~` or `$HOME` directory to contain the user-specific variables. Follow the below steps: 
* In the `~` directory, run `echo $PATH`. Copy the output.
* Create a new `.profile` file using `touch .profile`. 
* Open it up for editing using any editor. Add the copied $PATH variable value, for example:
```bash
export PATH=$PATH:/usr/local/mysql/bin/
```
* Add the value for other variables specific for you:
```bash
export POSTGRESS_USERNAME=myusername;
export POSTGRESS_PASSWORD=mypassword;
export POSTGRESS_DB=postgres;
export POSTGRESS_HOST=udagramdemo.abc4def.us-east-2.rds.amazonaws.com;
export AWS_REGION=us-east-2;
export AWS_PROFILE=default;
export AWS_BUCKET=udagramdemo;
export JWT_SECRET=helloworld;
```
**Change the values of the above mentioned variables as applicable for you**. 



#### More about the Backend Endpoint
Ionic uses enviornment files located in `./src/enviornments/enviornment.*.ts` to load configuration variables at runtime. By default `environment.ts` is used for development and `enviornment.prod.ts` is used for produciton. The `apiHost` variable should be set to your server url either locally or in the cloud.

#### Task 3 - Start the backend npm server
We will start the backend first and the frontend later. Open a **new** terminal and navigate to the `/udacity-c3-restapi/` directory. Use `npm` to install all dependencies as mentioned in the `package.json`:
```bash
npm install
source ~/.profile
npm run dev
```

#### Task 4 - Start the frontend server
Next, open another terminal and navigate to the `/udacity-c3-frontend/` folder, and use `npm` to install all dependencies:

```bash
npm install
```
Ionic CLI provides an easy to use development server to run and autoreload the frontend. This allows you to make quick changes and see them in real time in your browser. Start the Ionic server as follows:

```bash
ionic serve
```
A successful command would automatically start the services at `http://localhost:8100/home`. 


