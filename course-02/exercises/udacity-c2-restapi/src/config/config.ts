export const config = {
  "postgres": {
    "username": "postgres",
    "password": "postgres1",
    "database": "udgramdatabse",
    "host": "database1.cmtn29uv7ozo.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    //"aws_profile": "default",
    "aws_media_bucket": "krishnatry-website",
    "storage":"memory"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
