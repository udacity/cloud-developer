export const config = {
  "dev": {
    "username": process.env.UD_DB_USERNAME,
    "password": process.env.UD_DB_PWD,
    "database": process.env.UD_DB_NAME,
    "host": process.env.UD_DB_HOSTNAME,
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": process.env.UD_S3_MEDIABUCKETNAME
  },
  "prod": {
    "username": process.env.UD_DB_USERNAME,
    "password": process.env.UD_DB_PWD,
    "database": process.env.UD_DB_NAME,
    "host": process.env.UD_DB_HOSTNAME,
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": process.env.UD_S3_MEDIABUCKETNAME
  }
}
