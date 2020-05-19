import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


var c = config.dev;
if(config.environment_type === "PROD") {
  console.log("Using prod setup")
  c = config.prod
}


// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  dialect: 'postgres',
  storage: ':memory:',
});

