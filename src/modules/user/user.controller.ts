import { Request, Response, Router } from 'express';
import { BaseController } from '@base/controller.base';
import { UserMapper } from './user.mapper';

export class UserController extends BaseController {
    public path = '/user';
    public router = Router();
    private userMapper: UserMapper;

    constructor() {
        super();
        this.initializeRoutes();
        this.userMapper = new UserMapper();
    }

    public initializeRoutes() {
        this.router.get(this.route('all'), this.getAllUsers);
        this.router.post(this.route('create'), this.createUser);
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            res.send(await this.userMapper.findAll());
        } catch (error) {
            this.log(error);
        }
    };

    createUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userMapper.create(req.body);

            return res.json(user).status(201);
        } catch (error) {
            this.log(error);

            return res.status(401).send(error);
        }
    };
}
