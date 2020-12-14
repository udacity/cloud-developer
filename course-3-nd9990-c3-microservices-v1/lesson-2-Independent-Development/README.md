## Lesson 2 - Independent Development - Divide the Backend
The exercises in this lesson are an extension of the exercises you have already done in the previous **"Lesson 1 - Best Practices for Micro-Services Development"**.  We will use the same "Udagram" project, and convert the monolithic architecture into independent development. *Our goal is to create an independent codebase for each service, that can be developed, tested, and deployed by small teams.*

### Exercise Instructions
#### Task 1 - Clone the project GitHub repository (if not aleady)
Clone the [course repo](https://github.com/scheeles/cloud-developer) and stay on the `master` branch. **We will use the starter code from the lesson - 1.** 
```bash
git clone https://github.com/udacity/nd9990-c3-microservices-v1
cd nd9990-c3-microservices-v1/
git branch
```
Navigate to the `/lesson-1-Best-Practices/exercises/` directory.


#### Task 2 - Set the User-specific environment variables (if not already)
Like the last exercise (lesson 1), you'll need to access the AWS RDS database and S3 bucket.  Make sure that the RDS instance is running and that you have defined all of the environment variables in your `./profile` file that is called in the `config.ts`. 

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

#### Task 3 - Split the Backend code into two microservices "feed" and "user"
1. Make a copy of the `udacity-c3-restapi` and name it `udacity-c3-restapi-feed`.
2. Rename the original `udacity-c3-restapi` folder `udacity-c3-restapi-user`.
3. In the `udacity-c3-restapi-user` folder:
    * Delete the `feed` controller folder
    * Update `index.router.ts` file to remove the `FeedRouter` router
    * Update `model.index.ts` to remove the `Feed` model

4. In the `udacity-c3-restapi-feed` folder:
    * Delete the `user` controller folder
    * Update `index.router.ts` file to remove the `UserRouter` router
    * Update `model.index.ts` to remove the `User` model



#### Task 4 - Run the two microservices  
1. Navigate and install the dependencies in `udacity-c3-restapi-feed` directory using npm. Then, start the server.

```bash
# To install the depnedencies
npm install
# To start the backend server
npm run dev
```

2. In a **new** terminal, navigate to the `udacity-c3-frontend` folder, install the dependecies and run the server

```bash
npm install
ionic serve
```

3. Run the application in your browser: [http://localhost:8100/home](http://localhost:8100/home)  
**Notice that it loads -- but throws an error because the `User` service is not running.**

4. In a **new** terminal, navigate to the `udacity-c3-restapi-user` folder, install the dependencies and run the server

```bash
npm install
npm run dev
```

**Now you'll get another error because the `Feed` service is already running on port 8080.**

>[ERROR] 19:33:24 Error: listen EADDRINUSE: address already in use :::8080

In the next lesson, we'll learn how to use containers to get ***both*** services running simultaneously.