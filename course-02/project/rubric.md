# PROJECT SPECIFICATION
## Engineering Full Stack Apps in the Cloud

### Engineering Process and Quality

- [X] **The project demonstrates an understanding of a good cloud git process** All project code is stored in a GitHub repository and this link has been submitted for review. There are at least two branches - one for development (dev, development) and one master. Master should contain the most up-to-date, stable code at the time of submission.
- [X] **The project demonstrates an ability to use typescript and Nodejs** Any variables use typescript typing wherever possible, variable and function names are clear, endpoints are logically named. Good coding practices are followed.

### Development Server

- [X] **The project demonstrates the ability to develop using the NodeJS framework** Starting the server with npm run dev runs a local instance of the server with no errors
- [X] **The project demonstrates an understanding of RESTFUL design** The stubbed @TODO1 endpoint in src/server.ts is completed and accepts valid requests including: http://localhost:{{PORT}}/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg

- [X] **The project demonstrates an understanding of HTTP status codes** Successful responses have a 200 code, at least one error code for caught errors (i.e. 422)

### Elastic Beanstalk Deployment

- [] **The project demonstrates the ability to create functional cloud deployments** An endpoint URL for a running elastic beanstalk deployment (EB_URL) has been submitted along with the project submission. This endpoint responds to valid GET requests including:
http://{{EB_URL}}/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg
- [] **The project demonstrates an understanding of AWS Elastic Beanstalk’s CLI and Console Dashboard** The project was deployed using the AWS Elastic Beanstalk CLI eb init, eb create, and eb deploy commands.
- [] A screenshot of the elastic beanstalk application dashboard is included in a deployment_screenshot directory.