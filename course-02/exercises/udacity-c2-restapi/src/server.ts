require('dotenv').config();
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';

import {V0MODELS} from './controllers/v0/model.index';

import {config} from './config/config';

(async () => {
    await sequelize.addModels(V0MODELS);
    await sequelize.sync();

    const app = express();

    app.use(bodyParser.json());

    // CORS Should be restricted
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', config.server.allow_origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });

    app.use('/api/v0/', IndexRouter);

    // Root URI call
    app.get('/', async (req, res) => {
        res.send('/api/v0/');
    });


    // Start the Server
    app.listen(config.server.port, () => {
        console.log(`server running http://localhost:${config.server.port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
