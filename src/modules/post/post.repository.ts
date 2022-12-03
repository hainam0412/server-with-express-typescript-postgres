import { BaseRepository } from '@base/repository.base';
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
}