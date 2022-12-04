import 'module-alias/register';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import { BaseController } from './base/controller.base';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

import { syncModels } from './db';
import { startCronJob } from './cron-job';
import { APP_CONTROLLERS } from './config';

const port = Number(process.env.PORT);

class App {
    public app: Application;

    constructor(controllers: BaseController[]) {
        this.app = express();
        this.initializeMiddleWares();
        this.initializeControllers(controllers);
        this.initializeAppConfiguration();
    }

    public listen() {
        this.app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }

    private initializeMiddleWares() {
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
    }

    private async initializeAppConfiguration() {
        await syncModels();
        startCronJob();
    }

    private initializeControllers(controllers: BaseController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

const app = new App(APP_CONTROLLERS);
app.listen();
