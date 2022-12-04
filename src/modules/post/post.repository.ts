import { BaseRepository } from '@base/repository.base';
import { PostDto } from './post.dto';
import { PostRepositoryInterface } from './post.interface';
import { Post } from './post.model';
import { PostType } from './post.type';

export class PostRepository extends BaseRepository implements PostRepositoryInterface {
    async findAll(): Promise<Post[]> {
        return await Post.findAll();
    }

    async getById(id: number): Promise<Post | null> {
        return await Post.findOne({ where: { id } });
    }

    async delete(id: number): Promise<any> {}

    async checkExistsByUrlAndType(url: string, type: PostType): Promise<boolean> {
        return null !== (await Post.findOne({ where: { url, type } }));
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
}
