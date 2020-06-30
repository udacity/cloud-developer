import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const postgres = config.postgress;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": postgres.username,
  "password": postgres.password,
  "database": postgres.database,
  "host":     postgres.host,
  dialect: 'postgres',
  storage: ':memory:',
});

