export const config = {
  "postgress": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASS,
    "database": process.env.POSTGRESS_DB,
    "host": process.env.POSTGRESS_HOST,
    "dialect": process.env.SQL_DIALECT
  },
  "aws": {
    "region": process.env.AWS_REGION,
    "profile": process.env.AWS_PROFILE,
    "media_bucket": process.env.AWS_MEDIA_BUCKET,
    "s3": {
      "access_key_id": process.env.AWS_S3_ACCESS_KEY_ID,
      "secret_access_key": process.env.AWS_S3_SECRET_ACCESS_KEY
    }
  },
  "jwt": {
    "secret": "helloworld"
  }
}
