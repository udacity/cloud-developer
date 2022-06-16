export const config = {
  "dev": {
    "dialect": "postgres",
    "username": "udagramdev",
    "password": "udagramdev",
    "database": "udagramdev",
    "host": "udagramdev.cpb1w6xnojlu.us-east-1.rds.amazonaws.com",

    "aws_region": "us-east-1",
    "aws_profile": "udagram-dev",
    "aws_media_bucket": "udagram-241508125034-dev"
  },
  "prod": {
    "dialect": "postgres",
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
  },
  "jwt": {
    "secret": " "
  }
}
