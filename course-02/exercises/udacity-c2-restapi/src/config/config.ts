export const config = {
  dev: {
    username: "postgres",
    password: "ba1ya4da2",
    database: "udacitydb",
    host: "udacitydb.cihhqfue35of.us-east-1.rds.amazonaws.com",
    dialect: "postgres",
    aws_region: "us-east-1",
    aws_profile: "default",
    aws_media_bucket: "udagram-oyin-dev",
  },
  jwt: {
    secret: " ",
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres",
  },
};
