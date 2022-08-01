export const config = {
  "dev": {
    "username": "alexis",
    "password": "password",
    "database": "udagramdatabase",
    "host": "udagramdatabase.csn5tt9drlpm.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "udagram",
    "aws_media_bucket": "udagram-alexis-dev"
  },
  "jwt": {
    "secret": " "
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
