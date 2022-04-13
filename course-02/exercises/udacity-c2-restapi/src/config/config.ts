export const config = {
  "postgress": {
    "username": process.env.POSTGRESS_USERNAME,  //"udagrampolakdev",
    "password": process.env.POSTGRESS_PASSWORD,   //"seminoles",
    "database": process.env.POSTGRESS_DATABASE,
    "host":  process.env.POSTGRESS_HOST,   //"udagrampolakdev.cyvqk0vbjyrv.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROGILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "jwt": {
    "secret": "helloworld"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
