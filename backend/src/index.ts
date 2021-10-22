import 'reflect-metadata';
import {createConnection} from 'typeorm';
import { connectionOptions } from '../ormconfig';
import express from 'express';
import { getRouter } from './routes';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";

createConnection(connectionOptions).then(async conn => {

    await conn.runMigrations();

    const app = express();
    const cors = require('cors');
    const helmet = require('helmet');
    const path = require('path')
    

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use(express.json());
    app.use('/api', getRouter());
    app.use(express.static('uploads'))

    

    app.listen(3000, () => {
        console.log('Listening on 3000 ...');
    });
}).catch(error => console.log(error));
