export const config = {
  'postgress': {
    'username': process.env.PROGRESS_USERNAME,
    'password': process.env.PROGRESS_PASSWORD,
    'database': process.env.PROGRESS_DATABASE,
    'host': process.env.PROGRESS_HOST,
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
