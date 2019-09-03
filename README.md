# Udagram Image Filtering Microservice
For local builds and docker builds please refer to the correct respective directory


# Travis

Travis is currently building when there is a commit or push made to the repository 

```course-03/exercises/udacity-c3-deployment/docker/docker-compose-build.yaml```

travis will push the latest docker images if there is a merge to the master branch.
Check out travis.yml for more info



# Kubernetes deployments on AWS

## Requirements

Please install and setup the following before proceeding
```
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
https://github.com/kubermatic/kubeone/blob/master/docs/quickstart-aws.md
```

After setting up the aws-cli you will have a credential file in ```~./aws/credentials```

We will need to get the credentials in base64 format and the password and username of the postgeres database

linux command
```
cd ~./aws
base64 credentials -w 0
echo -n '${POSTGRESS_USERNAME}' | base64
echo -n '${POSTGRESS_PASSWORD}' | base64
```
Paste the output into {repo}/exercises/k8s/aws-secret and {repo}/exercises/k8s/env-secret for the relevent fields

Also go set all the relavent environement variable into the configmap

Do apply kubectl apply on all the deloyment and services except for the front end. 
```
kubectl apply -f {file_name}
```
Now we will have our cluster set up. 



