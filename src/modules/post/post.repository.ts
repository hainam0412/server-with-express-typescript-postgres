import { BaseRepository } from '@base/repository.base';
import { PostDto } from './post.dto';
import { PostRepositoryInterface } from './post.interface';
import { PostModel } from './post.model';
import { PostType } from './post.type';

export class PostRepository extends BaseRepository implements PostRepositoryInterface {
    async findAll(): Promise<PostModel[]> {
        return await PostModel.findAll();
    }

    async findById(id: number): Promise<PostModel | null> {
        return await PostModel.findOne({ where: { id } });
    }

    async findBySlug(slug: string): Promise<PostModel | null> {
        return await PostModel.findOne({ where: { slug } });
    }

    async delete(id: number): Promise<any> {}

    async checkExistsByUrlAndType(url: string, type: PostType): Promise<boolean> {
        return null !== (await PostModel.findOne({ where: { url, type } }));
    }

    async getCrawlPostsByCrawUrl(crawUrl: string): Promise<PostModel[]> {
        return await PostModel.findAll({ where: { crawUrl, type: PostType.crawl } });
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

        return await PostModel.bulkCreate(posts);
    }

    async update(id: number): Promise<void> {}
}
