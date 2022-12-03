import 'module-alias/register';
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import { BaseController } from './base/controller.base';
import { UserController } from './modules/user/user.controller';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

import { syncModels } from './db';

const port = Number(process.env.PORT);

class App {
    public app: Application;

    constructor(controllers: BaseController[]) {
        this.app = express();
        this.initializeMiddleWares().then(() => {
            this.initializeControllers(controllers);
        });
    }

    public listen() {
        this.app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }

    private async initializeMiddleWares() {
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        await syncModels();
    }

    private initializeControllers(controllers: BaseController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

const app = new App([new UserController()]);
app.listen();
