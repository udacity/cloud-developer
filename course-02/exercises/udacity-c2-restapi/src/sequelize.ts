import {Sequelize} from 'sequelize-typescript';
import {config} from './config/config';

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    host: config.db.host,
    dialect: config.db.dialect,
    storage: ':memory:',
});

