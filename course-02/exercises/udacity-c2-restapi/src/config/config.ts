export const config = {
  "dev": {
    "username": "postgres",
    "password": "postgres",
    "database": "postgres",
    "host": "database-3.cd8aqdzpznqo.us-east-2.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-2",
    "aws_profile": "default",
    "aws_media_bucket": "udagram-ruttner-dev"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
