export const config = {
  "db": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST
  },
  "aws": {
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET,
    "aws_access_key_id": process.env.AWS_ACCESS_KEY_ID,
    "aws_secret_access_key": process.env.AWS_SECRET_ACCESS_KEY
  },
  "jwt" : {
    "secret" : process.env.JWT_SECRET
  },
  "cors" : {
    "access_control_allow_origin": process.env.ACCESS_CONTROL_ALLOW_ORIGIN
  },
  "sentry" : {
    "dsn" : process.env.SENTRY_DNS_FEED
  }
}
