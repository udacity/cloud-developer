export const config = {
  "dev": {
    "username": "udagrammike",
    "password": "udagrammike",
    "database": "postgres",
    "host": "udagrammike.cp8hwom8uvek.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-2",
    "aws_profile": "default",
    "aws_media_bucket": "udagrammike"
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


// export const config = {
//   "dev": {
//     "username": process.env.POSTGRESS_USERNAME,
//     "password": process.env.POSTGRESS_PASSWORD,
//     "database": process.env.POSTGRESS_DATABASE,
//     "host": process.env.POSTGRESS_HOST,
//     "dialect": "postgres",
//     "aws_region": process.env.POSTGRESS_REGION,
//     "aws_profile":process.env.POSTGRESS_PROFILE,
//     "aws_media_bucket": process.env.POSTGRESS_AWS_MEDIA_BUCKET
//   },
//   "jwt": {
//     "secret": " "
//   },
//   "prod": {
//     "username": "",
//     "password": "",
//     "database": "udagram_prod",
//     "host": "",
//     "dialect": "postgres"
//   }
// }