import { Post } from './post.model';
import { PostType } from './post.type';

export interface PostRepositoryInterface extends RepositoryInterface<Post> {
    getById(id: number): Promise<Post | null>;
}

export interface PostInterface {
    id?: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    tag: string[];
    type: PostType;
    url: string | null;
}
