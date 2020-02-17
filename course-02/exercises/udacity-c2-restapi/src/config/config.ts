export const config = {
  "dev": {
    "username": "udagramrutterdev",
    "password": "udagramrutterdev",
    "database": "udagramrutterdev",
    "host": "udagramrutterdev.cssbqp38nd92.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": "udagram-ruttner-dev-tomorn"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt" : {
    "secret": "hellowold"
  }
}
