export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_processWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.POSTGRESS_REGION,
    "aws_profile": process.env.POSTGRESS_PROFILE,
    "aws_media_bucket": process.env.POSTGRESS_BUCKET
  },
  "jwt": {
    "secret": " "
  },
  "prod": {
    "username": "",
    "processword": "",
    "database": "",
    "host": "",
    "dialect": ""
  }
}
