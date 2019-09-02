#!/bin/bash
echo "$DOCKER_USERNAME" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push weilip/udacity-restapi-user
docker push weilip/udacity-restapi-feed