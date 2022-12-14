import { PostModel } from '../model/post.model';
import { PostRepository } from '../repository/post.repository';
import { PostResponseType } from '../type/post.type';

export class PostMapper {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    public async findAll(): Promise<PostResponseType[]> {
        const posts = await this.postRepository.findAll();

        return posts.map((post) => {
            return this.responseMapping(post);
        });
    }

    public async getById(id: number): Promise<PostResponseType | null> {
        const post = await this.postRepository.findById(id);

        return post ? this.responseMapping(post) : null;
    }

    public async getBySlug(slug: string): Promise<PostResponseType | null> {
        const post = await this.postRepository.findBySlug(slug);

        return post ? this.responseMapping(post) : null;
    }

    private responseMapping(post: PostModel): PostResponseType {
        return {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            tag: post.tag,
            type: post.type,
            url: post.url,
            crawUrl: post.crawUrl,
        };
    }
}
