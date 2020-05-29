import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.db_username,
  "password": c.db_password,
  "database": c.database,
  "host":     c.db_host,

  dialect: 'postgres',
  storage: ':memory:',
});

