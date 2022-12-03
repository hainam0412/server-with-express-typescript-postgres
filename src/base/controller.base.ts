import { Response, Router } from 'express';
import { Logger } from '@utils/logger';

export class BaseController {
    public path: string = '';
    public router = Router();

    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    public route(route: string) {
        return `${this.path}/${route}`;
    }

    public log(message: any) {
        this.logger.write('server', message);
    }

    public sendError(res: Response, message: unknown, status: number = 404) {
        return res.status(status).json({ message });
    }
}
