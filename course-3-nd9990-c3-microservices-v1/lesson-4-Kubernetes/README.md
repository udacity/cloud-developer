## Lesson 4 - Kubernetes
The exercises in this lesson are an extension of the exercises you have already done in the previous lesson - **"Containers"**.  We will use the same "Udagram" project, learn to manage the microservices running in separate containers using the Kubernetes cluster. 
### Dependencies
In addition to dependencies installed in Lesson 3 - Containers, you need to have anyone tool (KubeOne, MiniKube, or kubectl with Docker Desktop) to create the Kubernetes cluster.

### Exercise Instructions
Follow the below instructions:
#### Instruction 1 - Clone the GitHub repo (if not already)
Clone the following Git repository - https://github.com/udacity/nd990-c3-microservices-v1

To start with, go to the */lesson-4-Kubernetes/exercise/* directory. You would find the following sub-directories for each component of the project, as follows:
1. *udacity-c3-frontend* - For Ionic client web application, which consumes the RestAPI Backend
2. *udacity-c3-restapi-feed* - For "feed" microservice
3. *udacity-c3-restapi-user* - For "user" microservice
4. *udacity-c3-deployment/docker* - For running the Nginx as a reverse-proxy server


#### Instruction 2 - Create configuration files (`.yaml`) 
Create a sub-directory with the name `k8s` (acronym for Kubernetes) at the path *lesson-4-Kubernetes/exercise/udacity-c3-deployment/*. Create the following configuration files:
>* udacity-c3-deployment/k8s/reverseproxy-deployment.yaml
>* udacity-c3-deployment/k8s/frontend-deployment.yaml
>* udacity-c3-deployment/k8s/backend-user-deployment.yaml
>* udacity-c3-deployment/k8s/backend-feed-deployment.yaml
>* udacity-c3-deployment/k8s/pod-example/pod.yaml


#### Instruction 3 - Create Docker Images
Create Docker images for all the services of your Udagram application.

#### Instruction 4 - Deploy Kubernetes Cluster
##### Task 1 - Set up a cluster
First, set up a Kubernetes cluster with KubeOne/MiniKube/kubectl. Refer - 
[Creation of Kubernetes Cluster](https://classroom.udacity.com/nanodegrees/nd9990/parts/96fffeca-63e0-4bfc-92a6-a869b5b64b9e/modules/8c55d5a1-ae41-4313-ab37-86b1f35b9ada/lessons/e03717be-332d-4a2e-8576-69f7aae7726e/concepts/fac375ff-8a1c-461f-8e7c-6c9a844358ac)

##### Task 2 - Configure the Pod
Second, configure the pod and convert our pods into deployments. Use Kubernetes for the deployment. 
* Create a pod each for the feed, user, and frontend service
* Convert the pod into a deployment

##### Task 3 - Deploy the application in a Cluster
* Deploy your Udagram microservices application in a Kubernetes Cluster 


### Solution 
If you need help, you may refer to the **solution** available at */lesson-4-Kubernetes/solution/* directory