FROM beevelop/ionic:v5.2.3 AS ionic

WORKDIR /user/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN ionic build

#EXPOSE 8100

#ENTRYPOINT ["ionic"]
#CMD ["serve", "8100", "--address", "0.0.0.0"]

#RUN ionic build

## Run 
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
#COPY www /usr/share/nginx/html
COPY --from=ionic /usr/src/app/www .