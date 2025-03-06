import express from 'express';
import bootstrap from './src/app.controller.js';
import { runSocket } from './src/socketio/index.js';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();
const app = express();
bootstrap(app, express);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(chalk.blue.bgRed.bold(`Example app listening on port ${port}!`)))

runSocket(server);
