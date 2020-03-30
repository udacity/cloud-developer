import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;
console.log("**** host name 8***** ",process.env.POSTGRES_HOST);
console.log(c.username, c.password, c.database, c.host);
// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  dialect: 'postgres',
  storage: ':memory:',
});

