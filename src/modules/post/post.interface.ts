import { Post } from './post.model';

export interface PostRepositoryInterface extends RepositoryInterface<Post> {
    getById(id: number): Promise<Post | null>;
}

export interface PostInterface {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    tag: string[];
}