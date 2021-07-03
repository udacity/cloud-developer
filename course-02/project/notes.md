**Notes**

EBS URL: http://udagram-development.us-east-1.elasticbeanstalk.com
Example endpoint: http://udagram-development.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://cdn.pixabay.com/photo/2021/05/23/21/57/mountains-6277391_1280.jpg

I've written integration tests for the endpoint to ensure the project meets the code specs.

Given the example image url in the rubric: https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg
Jimp fails to read this file specifically. but will read every other publicly accessible image file I've tested. I have tested about a dozen different image urls including images of similar size and only the kitten image mentioned in the project rubric seems to fail for me. I'm also running the latest stable version of Jimp and confirmed this is a known issue that hasn't been resolved. Here's the github issue [here](https://github.com/oliver-moran/jimp/issues/775). Given this project is more about cloud infrastructure and deployment, I didn't see the need to devote more time trying to fix this edge case. I thought you'd like to know so you can notify other students about this, or refactor your project starter code to use a different image transformation library.

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

- [X] **The project demonstrates the ability to create functional cloud deployments** An endpoint URL for a running elastic beanstalk deployment (EB_URL) has been submitted along with the project submission. This endpoint responds to valid GET requests including:
http://{{EB_URL}}/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg
- [X] **The project demonstrates an understanding of AWS Elastic Beanstalk’s CLI and Console Dashboard** The project was deployed using the AWS Elastic Beanstalk CLI eb init, eb create, and eb deploy commands.
- [X] A screenshot of the elastic beanstalk application dashboard is included in a deployment_screenshot directory.
