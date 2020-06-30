export const config = {
  "postgress": {
    "username": process.env.UDAGRAM_POSTGRESS_USERNAME,
    "password": process.env.UDAGRAM_POSTGRESS_PASSWORD,
    "database": process.env.UDAGRAM_POSTGRESS_DATABASE,
    "host":process.env.UDAGRAM_POSTGRESS_HOST,
    "dialect": process.env.UDAGRAM_POSTGRESS_DIALECT
  },
  "aws": {
    "region": process.env.UDAGRAM_AWS_REGION,
    "profile": process.env.UDAGRAM_AWS_PROFILE,
    "media_bucket": process.env.UDAGRAM_AWS_MEDIA_BUCKET
  }
}
