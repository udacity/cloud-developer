export const config = {
  "dev": {
    "username": process.env.UDA_POSTGRES_USERNAME,
    "password": process.env.UDA_POSTGRES_PASSWORD,
    "database": process.env.UDA_POSTGRES_DATABASE,
    "host": process.env.UDA_POSTGRES_HOST,
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
  }
}
