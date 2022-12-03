import { Router } from 'express';

export class AbstractController {
    public path: string = '';
    public router = Router();

    public route(route: string) {
        return `${this.path}/${route}`;
    }
}
