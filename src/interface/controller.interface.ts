import { Router, Response } from 'express';

export interface ControllerInterface {
    path: string;
    router: Router;

    route: (route: string) => string;
    log: (message: any) => void;
    sendError: (res: Response, message: unknown, status: number) => Response<any, Record<string, any>>;
    initializeRoutes: () => void;
}
