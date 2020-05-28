# create docker image
docker build -t mamadly/udacity-cloud-dev-reverse-proxy:reverse-proxy-v1 reverse-proxy
docker build -t mamadly/udacity-cloud-dev-frontend:frontend-v1 udacity-c2-frontend
docker build -t mamadly/udacity-cloud-dev-feed:feed-v1 udacity-c2-feed
docker build -t mamadly/udacity-cloud-dev-user:user-v1 udacity-c2-user

# push to docker hub
docker push mamadly/udacity-cloud-dev-reverse-proxy:reverse-proxy-v1
docker push mamadly/udacity-cloud-dev-frontend:frontend-v1
docker push mamadly/udacity-cloud-dev-feed:feed-v1
docker push mamadly/udacity-cloud-dev-user:user-v1