export const config = {
  "dev": {
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSCODE,
    "database": process.env.RDS_DATABASE,
    "host": process.env.RDS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }, 
  'jwt' :{
    "secret": "helloworld"
  }
}
