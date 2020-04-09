export const config = {
  "postgres": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres"
  },
  "aws": {
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET,
    "storage":"memory"
  },
  "util": {
    "saltRounds":10,
    "secretKey": "AWS CLOUD TRYOUT"
  }
}
