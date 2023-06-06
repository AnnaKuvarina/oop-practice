import App from './app';

import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';

import BurgersController from './controllers/burgers/burgers.controller';
import HomeController from './controllers/home/home.controller';
import { APPLICATION_PORT } from './constants/server';

const app = new App({
  port: APPLICATION_PORT,
  controllers: [
    new HomeController(),
    new BurgersController()
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();
