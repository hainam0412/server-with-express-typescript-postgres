import { PostRepository } from './post.repository';
import { PostResponseType } from './post.type';

export class PostMapper {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    public async findAll(): Promise<PostResponseType[]> {
        const posts = await this.postRepository.findAll();

        return posts.map((post) => {
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
        });
    }
}
