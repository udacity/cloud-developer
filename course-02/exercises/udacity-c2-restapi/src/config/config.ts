import * as dotenv from "dotenv";

if(process.env.AWS_PROFILE !== "DEPLOYED") {
  let path;
  switch (process.env.NODE_ENV) {
    case "production":
      path = `${__dirname}/../../.env.production`;
      break;
    default:
      path = `${__dirname}/../../.env.dev`;
  }
  dotenv.config({ path: path });
}

console.log("\ndatabase is", process.env.POSTGRESS_HOST, "\n");

export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret": process.env.JWT_SECRET
  }
}
