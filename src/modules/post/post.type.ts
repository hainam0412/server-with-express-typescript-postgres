import { PostInterface } from './post.interface';

export enum PostType {
    crawl = 'crawl',
    default = 'default',
}

export type PostResponseType = Omit<PostInterface, 'id'>;
