FROM beevelop/ionic:v5.2.3

WORKDIR /user/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN ionic build

EXPOSE 8100

ENTRYPOINT ["ionic"]
CMD ["serve", "8100", "--address", "0.0.0.0"]