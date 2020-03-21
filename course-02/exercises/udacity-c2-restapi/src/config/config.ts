export const config = {
  dev: {
    username: "udagramnakitadev",
    password: "udagramnakitadev",
    database: "udagramnstrange",
    host: "udagramnstrange.cj6xemhpolby.us-west-1.rds.amazonaws.com",
    dialect: "postgres",
    aws_region: "us-west-1",
    aws_profile: "default",
    aws_media_bucket: "udagram-ruttner-dev"
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres"
  }
};
