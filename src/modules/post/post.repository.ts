import { BaseRepository } from '@base/repository.base';
import { PostDto } from './post.dto';
import { PostRepositoryInterface } from './post.interface';
import { Post } from './post.model';

export class PostRepository extends BaseRepository implements PostRepositoryInterface {
    async findAll(): Promise<Post[]> {
        return await Post.findAll();
    }

    async getById(id: number): Promise<Post | null> {
        return await Post.findOne({ where: { id } });
    }

    async delete(id: number): Promise<any> {}

    async bulkCreate(multiPostDto: PostDto[]) {
        const posts = multiPostDto.map((postDto) => {
            return {
                title: postDto.title,
                excerpt: postDto.excerpt,
                content: postDto.content,
                author: postDto.author,
                tag: postDto.tag,
                type: postDto.type,
                url: postDto.url,
            };
        });

        return await Post.bulkCreate(posts);
    }
}
