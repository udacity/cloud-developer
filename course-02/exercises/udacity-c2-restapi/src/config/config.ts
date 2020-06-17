export const config = {
  "dev": {
    "username": process.env.UDACITY_DB_USERNAME,
    "password": process.env.UDACITY_DB_PASSWORD,
    "database": process.env.UDACITY_DB_DATABASE,
    "host": process.env.UDACITY_DB_HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.UDACITY_AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}