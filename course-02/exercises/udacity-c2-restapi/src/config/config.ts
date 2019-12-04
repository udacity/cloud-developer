// export const config = {
//   "dev": {
//     "username": "udagramdupisaniedev",
//     "password": "udagramdupisaniedev",
//     "database": "udagramdupisaniedev",
//     "host": "udagramdupisaniedev.c3r2i88nwqix.eu-west-2.rds.amazonaws.com",
//     "dialect": "postgres",
//     "aws_region": "eu-west-2",
//     "aws_profile": "default",
//     "aws_media_bucket": "udagramdupisaniedev"
//   },
//   "prod": {
//     "username": "udagramdupisaniedev",
//     "password": "udagramdupisaniedev",
//     "database": "udagramdupisaniedev",
//     "host": "udagramdupisaniedev.c3r2i88nwqix.eu-west-2.rds.amazonaws.com",
//     "dialect": "postgres"
//   }
// }
export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DATABASE,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "udagramdupisaniedev",
    "password": "udagramdupisaniedev",
    "database": "udagramdupisaniedev",
    "host": "udagramdupisaniedev.c3r2i88nwqix.eu-west-2.rds.amazonaws.com",
    "dialect": "postgres"
  }
}
