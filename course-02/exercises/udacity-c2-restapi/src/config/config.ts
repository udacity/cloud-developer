export const config = {
  dev: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
    aws_region: process.env.AWS_REGION,
    aws_profile: process.env.AWS_PROFILE,
    aws_media_bucket: process.env.AWS_MEDIA_BUCKET,
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres",
  },
};

// export POSTGRES_USERNAME=udagramdbdev;
// export POSTGRES_PASSWORD=U3yZAsz2iVnvP5LyXpzy;
// export POSTGRES_DATABASE=udagramdbdev;
// export POSTGRES_HOST=udagramdbdev.chbi1lil3hyi.eu-west-2.rds.amazonaws.com;
// export POSTGRES_DIALECT=postgres;
// export AWS_REGION=eu-west-2;
// export AWS_PROFILE=udagramdbdev;
// export AWS_MEDIA_BUCKET=udagram-sdb-dev;
