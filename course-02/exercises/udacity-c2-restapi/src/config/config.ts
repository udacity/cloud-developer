export const config = {
  "db_username": process.env.DB_USERNAME,
  "db_password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "db_host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT,
  "aws_region": process.env.AWS_REGION,
  "aws_profile": process.env.AWS_PROFILE,
  "aws_media_bucket": process.env.AWS_S3_BUCKET,

  "jwt" : {
    "secret" : process.env.JWT_SECRET
  }
}
