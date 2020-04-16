export const config = {

  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": process.env.POSTGRESS_DIALECT,
    "aws_region": process.env.POSTGRESS_AWS_REGION,
    "aws_profile": process.env.POSTGRESS_AWS_PROFILE,
    "aws_media_bucket": process.env.POSTGRESS_AWS_MEDIA_BUCKET,
    "secret": "helloworld"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
