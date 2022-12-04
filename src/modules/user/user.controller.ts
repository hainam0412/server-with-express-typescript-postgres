import { Request, Response, Router } from 'express';
import { BaseController } from '@base/controller.base';
import { UserMapper } from './user.mapper';
import { HTTP } from '@type/http/http.status.type';
import { ControllerInterface } from '@interface/controller.interface';

export class UserController extends BaseController implements ControllerInterface {
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
        this.router.put(this.route('update/:id'), this.updateUser);
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
            await this.userMapper.create(req.body);

            return res.status(HTTP.Created).send('');
        } catch (error) {
            this.log(error);

            return this.sendError(res, error, HTTP.Forbidden);
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userMapper.update(+req.params.id, req.body);

            return res.json(user);
        } catch (error) {
            this.log(error);

            return this.sendError(res, error, HTTP.Forbidden);
        }
    };
}
