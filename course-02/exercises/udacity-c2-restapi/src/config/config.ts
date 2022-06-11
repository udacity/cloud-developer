export const config = {
  "dev": {
    "username": "udagramDBDev",
    "password": "11111111",
    "database": "udagramDBDev",
    "host": "udagramdbdev.cj8zmco2l4nc.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": "udagram-001-dev"
    // "aws_media_bucket": "udagram-1234567890-bucket-dev"
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
