import { PostInterface } from './post.interface';

export enum PostType {
    craw = 'craw',
    default = 'default',
}

export type PostResponseType = Omit<PostInterface, 'id'>;
