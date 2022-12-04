import { Pattern } from '@type/pattern.type';
import { IsString, IsArray, IsEnum, Matches, IsUrl } from 'class-validator';
import { PostInterface } from './post.interface';
import { PostType } from './post.type';

export class PostDto implements PostInterface {
    @IsString()
    public id?: number;

    @IsString()
    public title: string;

    @Matches(Pattern.slug)
    public slug: string;

    @IsString()
    public excerpt: string;

    @IsString()
    public content: string;

    @IsString()
    public author?: string;

    @IsArray()
    public tag: string[];

    @IsEnum(PostType)
    type: PostType;

    url: string | null;

    crawUrl: string | null;
}
