import { BaseController } from '@base/controller.base';
import { ControllerInterface } from '@interface/controller.interface';
import { Request, Response } from 'express';
import { PostMapper } from '../mapper/post.mapper';
import { PostResponseType } from '../type/post.type';

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
        this.router.get(this.route(':slug'), this.getPostContentBySlug);
    }

    getAllPosts = async (req: Request, res: Response): Promise<Response<PostResponseType>> => {
        const posts = await this.postMapper.findAll();

        return res.json(posts);
    };

    getPostContentBySlug = async (req: Request, res: Response): Promise<Response<{ content: string }>> => {
        const post = await this.postMapper.getBySlug(req.params.slug);

        return res.json({ content: post ? post.content : `Post not found` });
    };
}
