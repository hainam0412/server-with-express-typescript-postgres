import { Request, Response, Router } from 'express';
import { User } from './user.model';
import { AbstractController } from '@module/abstract.controller';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';

export class UserController extends AbstractController {
    public path = '/user';
    public router = Router();
    private userRepository: UserRepository;
    private userMapper: UserMapper;

    constructor() {
        super();
        this.initializeRoutes();
        this.userRepository = new UserRepository();
        this.userMapper = new UserMapper();
    }

    public initializeRoutes() {
        this.router.get(this.route('all'), this.getAllUsers);
        this.router.post(this.route('create'), this.createUser);
    }

    getAllUsers = async  (req: Request, res: Response) => {
        res.send(await this.userMapper.findAll());
    };

    createUser = async (req: Request, res: Response) => {
        await this.userRepository.create(req.body);

        return res.json({
            name: req.body.name,
        });
    };
}
