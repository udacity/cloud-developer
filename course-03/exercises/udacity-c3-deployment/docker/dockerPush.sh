#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push webedhmb/udacity-restapi-feed
docker push webedhmb/udacity-restapi-user
docker push webedhmb/udacity-frontend
docker push webedhmb/reverseproxy