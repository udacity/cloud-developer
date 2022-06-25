export const config = {
  dev: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.PROJ_AWS_HOST,
    dialect: process.env.PROJ_AWS_DIALECT,
    aws_region: process.env.PROJ_AWS_REGION,
    aws_profile: process.env.PROJ_AWS_PROFILE,
    aws_media_bucket: process.env.PROJ_AWS_MEDIA_BUCKET,
  },
  jwt: {
    secret: process.env.PROJ_JWT_SECRET,
  },
  prod: {
    username: '',
    password: '',
    database: process.env.POSTGRES_PROD_DATABASE,
    host: '',
    dialect: process.env.PROJ_AWS_DIALECT,
  },
};
