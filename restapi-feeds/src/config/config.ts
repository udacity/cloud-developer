export const config = {
  'postgress': {
    'username': process.env.POSTGRES_USERNAME,
    'password': process.env.POSTGRES_PASSWORD,
    'database': process.env.POSTGRES_DATABASE,
    'host': process.env.POSTGRES_HOST,
    'dialect': 'postgres',
  },
  'aws': {
    'aws_region': process.env.AWS_REGION,
    'aws_profile': process.env.AWS_PROFILE,
    'aws_media_bucket': process.env.AWS_MEDIA_BUCKET
  },
  'jwt': {
    'secret': process.env.JWT_SECRET
  }
};
