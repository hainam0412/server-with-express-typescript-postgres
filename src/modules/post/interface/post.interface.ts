import { Optional } from 'sequelize';
import { PostModel } from '../model/post.model';
import { PostType } from '../type/post.type';

export interface PostRepositoryInterface extends RepositoryInterface<PostModel> {
    findById(id: number): Promise<PostModel | null>;
}

export interface PostInterface {
    id?: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author?: string;
    tag: string[];
    type: PostType;
    url: string | null;
    crawUrl: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PostInput extends Optional<PostInterface, 'id' | 'author'> {}
export interface PostOutput extends Required<PostInterface> {}
