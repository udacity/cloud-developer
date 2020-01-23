export const config = {
  "dev": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB_NAME,
    "host": "udgramdaifdev.cgfvp21rhzzp.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": "udagram-daif-dev",
    "jwt_secret": "helloworld"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
