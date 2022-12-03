import { Request, Response, Router } from 'express';
import { User } from './user.model';
import { AbstractController } from '@module/abstract.controller';

export class UserController extends AbstractController {
    public path = '/user';
    public router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.route('all'), this.getAllUsers);
    }

    getAllUsers = (req: Request, res: Response) => {
        res.send(User.findAll());
    };

    createUser = async (req: Request, res: Response) => {
        await User.create({
            name: 'John',
            email: 'john@gmail.com',
            password: 'password',
        });
    };
}
