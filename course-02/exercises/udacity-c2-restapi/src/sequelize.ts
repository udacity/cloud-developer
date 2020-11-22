import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.postgress.username,
  "password": c.postgress.password,
  "database": c.postgress.database,
  "host":     c.postgress.host,

  dialect: 'postgres',
  storage: ':memory:',
});

