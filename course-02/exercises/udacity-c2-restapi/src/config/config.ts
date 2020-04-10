export const config = {
  "dev": {
    "username": process.env.DEV_USERNAME,
    "password": process.env.DEV_PASSWORD,
    "database": process.env.DEV_DATABASE,
    "host": process.env.DEV_HOST,
    "dialect": "postgres",
    "aws_region": process.env.DEV_AWS_REGION,
    "aws_profile": process.env.DEV_AWS_PROFILE,
    "aws_media_bucket": process.env.DEV_AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
