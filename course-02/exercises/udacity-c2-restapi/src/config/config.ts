export const config = {
  "dev": {
    "username": process.env.POSTGRE_USERNAME,
    "password": process.env.POSTGRE_PASSWORD,
    "database": process.env.POSTGRE_DATABASE,
    "host": process.env.POSTGRE_HOST,
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
