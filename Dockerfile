FROM node:12-alpine

RUN apk add --no-cache curl python3 py3-pip

RUN npm install -g @ionic/cli

RUN apk add --no-cache \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install \
        awscli \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

EXPOSE 8082
EXPOSE 8080
