export const config = {
  "postgress": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DBNAME,
    "host": process.env.HOSTNAME,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": "default",
    "aws_media_bucket": process.env.MEDIA_BUCKET
  },
  "aws": {
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket":process.env.MEDIA_BUCKET
  },
  "jwt":{
    "secret":"helloworld"
  }
}
