FROM beevelop/ionic:v5.2.3 AS ionic

WORKDIR /usr/src/app

COPY package.json package-lock.json nginx.conf ./

RUN npm install

COPY . .

RUN ionic build


EXPOSE 8080

#ENTRYPOINT ["ionic"]
#CMD ["serve", "8100", "--address", "0.0.0.0"]

#RUN ionic build

## Run 
FROM nginx:alpine
#WORKDIR /usr/share/nginx/html
#COPY www /usr/share/nginx/html
COPY --from=ionic /usr/src/app/www /usr/share/nginx/html
COPY --from=ionic /usr/src/app/nginx.conf /etc/nginx/nginx.conf