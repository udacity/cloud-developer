export const config = {
  'dev': {
    'username': process.env.USERNAME_DEV,
    'password': process.env.PASSWORD_DEV,
    'database': process.env.DATABASE_DEV,
    'host': process.env.HOST_DEV,
    'dialect': process.env.DIALECT_DEV,
    'aws_region': process.env.AWS_REGION_DEV,
    'aws_profile': process.env.AWS_PROFILE_DEV,
    'aws_media_bucket': process.env.AWS_MEDIA_BUCKET_DEV
  },
  'prod': {
    'username': '',
    'password': '',
    'database': 'udagram_prod',
    'host': '',
    'dialect': 'postgres'
  }
};
