import { PostInterface } from '../interface/post.interface';

export enum PostType {
    crawl = 'crawl',
    default = 'default',
}

export type PostResponseType = Omit<PostInterface, 'id'>;
