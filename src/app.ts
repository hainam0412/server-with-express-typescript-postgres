import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { syncModels } from './db';
import { ENV_VAR } from './env';
import { FileUtils } from '@utils/file';
import { CronInterface } from '@interface/cron.interface';
import { ControllerInterface } from '@interface/controller.interface';

export class App {
    public app: Application;
    private fileUtils: FileUtils;

    constructor() {
        this.app = express();
        this.fileUtils = new FileUtils();
        this.initializeMiddleWares();
        this.initializeAppConfiguration();
    }

    public listen() {
        const port = ENV_VAR.PORT;

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
        await this.initializeCronJobs();
        await this.initializeControllers();
        await this.initializeCommands();
    }

    private async initializeControllers() {
        const controllers = await this.fileUtils.loadModules<ControllerInterface>('modules', 'controller');

        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private async initializeCronJobs() {
        const models = await this.fileUtils.loadModules<CronInterface>('modules', 'cron');

        for (const model of models) {
            model.startAllJobs();
        }
    }

    private async initializeCommands() {
        // await this.fileUtils.loadModules<CronInterface>('modules', 'command');
    }
}
