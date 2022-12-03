import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import { AbstractController } from './controller/abstract.controller';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

import { syncModels } from './db';
import { UserController } from './controller/user.controller';

const port = Number(process.env.PORT);

class App {
    public app: Application;

    constructor(controllers: AbstractController[]) {
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
        await syncModels({ force: true });
    }

    private initializeControllers(controllers: AbstractController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

const app = new App([new UserController()]);

app.listen();
