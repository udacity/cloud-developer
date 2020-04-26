export const config = {
    'dev': {
        'username': process.env.UDAGRAM_USERNAME,
        'password': process.env.UDAGRAM_PASSWORD,
        'database': process.env.UDAGRAM_DATABASE,
        'host': process.env.UDAGRAM_DATABASE_HOST,
        'aws_media_bucket': process.env.UDAGRAM_S3_BUCKET,
        'dialect': 'postgres',
        'aws_profile': process.env.AWS_PROFILE
    },
    'prod': {
        'username': process.env.UDAGRAM_USERNAME,
        'password': process.env.UDAGRAM_PASSWORD,
        'database': process.env.UDAGRAM_DATABASE,
        'host': process.env.UDAGRAM_DATABASE_HOST,
        'dialect': 'postgres'
    },
    'jwt': {
        'secret' : 'helloworld'
    }
};
