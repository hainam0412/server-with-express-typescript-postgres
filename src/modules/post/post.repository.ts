import { BaseRepository } from '@base/repository.base';
import { PostDto } from './post.dto';
import { PostRepositoryInterface } from './post.interface';
import { Post } from './post.model';
import { PostType } from './post.type';

export class PostRepository extends BaseRepository implements PostRepositoryInterface {
    async findAll(): Promise<Post[]> {
        return await Post.findAll();
    }

    async findById(id: number): Promise<Post | null> {
        return await Post.findOne({ where: { id } });
    }

    async findBySlug(slug: string): Promise<Post | null> {
        return await Post.findOne({ where: { slug } });
    }

    async delete(id: number): Promise<any> {}

    async checkExistsByUrlAndType(url: string, type: PostType): Promise<boolean> {
        return null !== (await Post.findOne({ where: { url, type } }));
    }

    async getCrawlPostsByCrawUrl(crawUrl: string): Promise<Post[]> {
        return await Post.findAll({ where: { crawUrl, type: PostType.crawl } });
    }

    async bulkCreate(multiPostDto: PostDto[]) {
        const posts = multiPostDto.map((postDto) => {
            return {
                title: postDto.title,
                slug: postDto.slug,
                excerpt: postDto.excerpt,
                content: postDto.content,
                author: postDto.author,
                tag: postDto.tag,
                type: postDto.type,
                url: postDto.url,
                crawUrl: postDto.crawUrl,
            };
        });

        return await Post.bulkCreate(posts);
    }

    async update(id: number): Promise<void> {}
}
