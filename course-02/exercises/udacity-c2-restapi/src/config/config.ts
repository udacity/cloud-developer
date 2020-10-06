export const config = {
  "dev": {
    "username": process.env.UDAGRAM_DEV_POSTGRESS_USERNAME,
    "password": process.env.UDAGRAM_DEV_POSTGRESS_PASSWORD,
    "database": process.env.UDAGRAM_DEV_POSTGRESS_DATABASE,
    "host": process.env.UDAGRAM_DEV_POSTGRESS_HOST,
    "dialect": process.env.UDAGRAM_DEV_POSTGRESS_DIALECT,
    "aws_region": process.env.UDAGRAM_DEV_AWS_REGION,
    "aws_profile": process.env.UDAGRAM_DEV_AWS_PROFILE,
    "aws_media_bucket": process.env.UDAGRAM_DEV_AWS_S3_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
