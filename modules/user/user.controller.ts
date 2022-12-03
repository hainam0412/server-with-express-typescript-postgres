import { Request, Response, Router } from 'express';
import { User } from './user.model';
import { AbstractController } from '@module/abstract.controller';
import { UserRepository } from './user.repository';

export class UserController extends AbstractController {
    public path = '/user';
    public router = Router();
    private userRepository: UserRepository;

    constructor() {
        super();
        this.initializeRoutes();
        this.userRepository = new UserRepository();
    }

    public initializeRoutes() {
        this.router.get(this.route('all'), this.getAllUsers);
        this.router.post(this.route('create'), this.createUser);
    }

    getAllUsers = (req: Request, res: Response) => {
        res.send(User.findAll());
    };

    createUser = async (req: Request, res: Response) => {
        await this.userRepository.create(req.body);

        return res.json({
            name: req.body.name,
        });
    };
}
