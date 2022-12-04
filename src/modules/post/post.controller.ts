import { BaseController } from '@base/controller.base';
import { ControllerInterface } from '@interface/controller.interface';
import { Request, Response } from 'express';
import { PostMapper } from './post.mapper';
import { PostResponseType } from './post.type';

export class PostController extends BaseController implements ControllerInterface {
    public path: string = '/post';

    private postMapper: PostMapper;

    constructor() {
        super();
        this.initializeRoutes();
        this.postMapper = new PostMapper();
    }

    public initializeRoutes() {
        this.router.get(this.route('all'), this.getAllPosts);
    }

    getAllPosts = async (req: Request, res: Response): Promise<Response<PostResponseType>> => {
        const posts = await this.postMapper.findAll();

        return res.json(posts);
    };
}
