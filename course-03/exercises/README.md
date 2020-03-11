# Refactor Udagram App into Microservices and Deploy


## Public Docker Images
https://hub.docker.com/r/cenjennifer/udacity-frontend
https://hub.docker.com/r/cenjennifer/udacity-restapi-feed
https://hub.docker.com/r/cenjennifer/udacity-restapi-user
https://hub.docker.com/r/cenjennifer/reverseproxy

## Set the following environment variables
To run in k8: add them in env-config.yaml and env-secret.yaml / aws-secret.yaml (values in base64) - note that these values aren’t committed to GitHub
To run locally: add them in `~/.profile` & source ~/.profile

      POSTGRESS_USERNAME: $POSTGRESS_USERNAME
      POSTGRESS_PASSWORD: $POSTGRESS_PASSWORD 
      POSTGRESS_DB: $POSTGRESS_DB 
      POSTGRESS_HOST: $POSTGRESS_HOST 
      AWS_REGION: $AWS_REGION 
      AWS_PROFILE: $AWS_PROFILE 
      AWS_BUCKET: $AWS_BUCKET
      JWT_SECRET: $JWT_SECRET
      URL: "http://localhost:8100"

## Repository
https://github.com/cenjennifer/cloud-developer/tree/master/course-03/exercises

## Screenshots
App Running: https://share.getcloudapp.com/4gumPbmO
`kubectl get nodes`: https://share.getcloudapp.com/E0uqjPPw
`kubectl get pods`: https://share.getcloudapp.com/2NuBPxlP
`kubectl get service & port-forward`: https://share.getcloudapp.com/JruWnvqE 

## Running on K8 cluster on AWS using Kubeone:
1. https://github.com/kubermatic/kubeone/blob/master/docs/quickstart-aws.md
2. When Kubeone with k8 cluster is set up and all the files are updated with the appropriate environment variables, cd into k8s directory and execute the following (in the same order):
    1. `kubectl apply env-configmap.yaml`
    2. `kubectl apply -f env-secret.yaml`
    3. `kubectl apply -f aws-secret.yaml`
    4. `kubectl apply -f backend-feed-deployment.yaml`
    5. `kubectl apply -f backend-feed-service.yaml`
    6. `kubectl apply -f backend-user-deployment.yaml`
    7. `kubectl apply -f backend-user-service.yaml`
    8. `kubectl apply -f frontend-deployment.yaml`
    9. `kubectl apply -f frontend-service.yaml`
    10. `kubectl apply -f reverseproxy-deployment.yaml`
    11. `kubectl apply -f reverseproxy-service.yaml`
3. Port-forwarding 8080 (reverse proxy for services) and 8100 (frontend)
	`kubectl port-forward service/frontend 8100:8100 &
  	  kubectl port-forward service/reverseproxy 8080:8080 &`

## Running locally using docker-compose
1. `cd course-03/exercises/udacity-c3-deployment/docker`
2. Build images: `docker-compose -f docker-compose-build.yaml build --parallel`
3. Push images up to registry: `docker-compose -f docker-compose-build.yaml push`
4. Run the images in docker container: `docker-compose up`

## Rolling Updates
1. Create a image with new tag: https://share.getcloudapp.com/WnuNkdQL 
2. Update the deployment file associated to that image with the updated info
3. `kubectl apply -f ${deployment}.yaml`: https://share.getcloudapp.com/JruWnXkW 

You should see the replica set for that service scaling down and new replicas get created with the changes from the new tagged image. No downtime should be encountered.

Screenshot of backend-feed pods being recreated with new tag: https://share.getcloudapp.com/xQugj94z

Alternatively, update the `${deployment}.yaml` (e.g. uncomment code in `backend-feed-deployment.yaml` to include a rollingUpdate strategy

## Travis CI/CD
1. See `.travis.yml`
2. Screenshot: https://share.getcloudapp.com/WnuNkwY6