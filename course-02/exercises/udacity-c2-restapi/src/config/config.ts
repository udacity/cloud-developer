export const config = {
  "dev": {
    "username": process.env.postgres_username,
    "password": process.env.postgres_password,
    "database": process.env.postgres_database,
    "host": process.env.postgres_host,
    "dialect": "postgres",
    "aws_region": process.env.aws_region,
    "aws_profile": process.env.aws_profile,
    "aws_media_bucket": process.env.aws_media_bucket
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret":process.env.JWT_SECRET
  }
}
