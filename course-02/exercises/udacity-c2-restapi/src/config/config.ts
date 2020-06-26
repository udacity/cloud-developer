export const config = {
  "dev": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
    // "username": "udagramramindev",
    // "password": process.env.DB_PASSWORD,
    // "database": "udagramramindev",
    // "host": "database-1.cohzar979pzq.eu-west-2.rds.amazonaws.com",
    // "dialect": "postgres",
    // "aws_region": "eu-west-2",
    // "aws_profile": "default",
    // "aws_media_bucket": "udagram-ramin-dev"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
