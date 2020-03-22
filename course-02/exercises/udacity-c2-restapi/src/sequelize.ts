import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

const c = config.dev;

export const sequelize = new Sequelize(
  "postgres://postgres:postgres@udagramnstrange.cj6xemhpolby.us-west-1.rds.amazonaws.com/udagramnstrange"
  // {
  //   dialect: "postgres"
  // }
);

// // Instantiate new Sequelize instance!
// export const sequelize = new Sequelize({
//   username: c.username,
//   password: c.password,
//   database: c.database,
//   host: c.host,

//   dialect: "postgres",
//   storage: ":memory:"
// });
