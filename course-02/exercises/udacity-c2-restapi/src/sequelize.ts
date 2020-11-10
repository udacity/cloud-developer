import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.postgress.username,
  "password": c.postgress.password,
  "database": c.postgress.database,
  "host":     c.postgress.host,

  dialect: c.postgress.dialect,
  storage: ':memory:',
});

