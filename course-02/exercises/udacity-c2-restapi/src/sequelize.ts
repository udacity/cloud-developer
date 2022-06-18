import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

const c = config.dev;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  username: c.username,
  password: c.password,
  database: c.database,
  host: c.host,
  logging: () => true,

  dialect: "postgres",
  storage: ":memory:",
});
