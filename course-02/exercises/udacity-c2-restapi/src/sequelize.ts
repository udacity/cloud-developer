import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
"username": process.env.POSTGRESS_USERNAME,
"password": process.env.POSTGRESS_PASSWORD,
"database": process.env.POSTGRESS_DATABASE,
"host": process.env.POSTGRESS_HOST,

dialect: 'postgres',
storage: ':memory:',
});

