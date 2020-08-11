export const config = {
  dev: {
    username: 'udagramgoyaldev',
    password: 'udagramgoyaldev',
    database: 'udagramgoyaldev',
    host: 'udagramgoyaldev.cpko0pkznkht.us-east-2.rds.amazonaws.com',
    dialect: 'postgres',
    aws_region: 'us-east-2',
    aws_profile: 'default',
    aws_media_bucket: 'udagram-ruttner-dev',
  },
  prod: {
    username: '',
    password: '',
    database: 'udagram_prod',
    host: '',
    dialect: 'postgres',
  },
};
