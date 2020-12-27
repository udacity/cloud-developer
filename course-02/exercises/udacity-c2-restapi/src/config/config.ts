export const config = {
  "aws": {
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "dev": {
    "username": process.env.POSTGREESS_USERNAME,
    "password": process.env.POSTGREESS_PASSWORD,
    "database": process.env.POSTGREESS_DATABASE,
    "host": process.env.POSTGREESS_HOST,
    "dialect": "postgres"
  }
}
