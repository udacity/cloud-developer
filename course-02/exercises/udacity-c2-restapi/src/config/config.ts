export const config = {
  "jwtsecret": process.env.UD_JWTSECRET,
  "environment_type": process.env.UD_ENVTYPE,
  "dev": {
    "username": process.env.DEV_UD_DB_USERNAME,
    "password": process.env.DEV_UD_DB_PWD,
    "database": process.env.DEV_UD_DB_NAME,
    "host": process.env.DEV_UD_DB_HOSTNAME,
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": process.env.DEV_UD_S3_MEDIABUCKETNAME,
    
  },
  "prod": {
    "username": process.env.UD_DB_USERNAME,
    "password": process.env.UD_DB_PWD,
    "database": process.env.UD_DB_NAME,
    "host": process.env.UD_DB_HOSTNAME,
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "DEPLOYED",
    "aws_media_bucket": process.env.UD_S3_MEDIABUCKETNAME,
  }
}
