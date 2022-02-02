/* export const config = {
  "dev": {
    "username": "uda1734469dev",
    "password": "uda1734469dev",
    "database": "uda1734469dev",
    "host": "database-1.coqjygnc84np.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "udacity",
    "aws_media_bucket": "udagram-1734469-dev"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret": "helloworld"
  }
} */
require("dotenv").config()


export const config = {
  "dev": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": process.env.POSTGRES_HOST,
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
