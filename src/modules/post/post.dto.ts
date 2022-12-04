import { Pattern } from '@type/pattern.type';
import { IsString, IsArray, IsEnum, Matches } from 'class-validator';
import { PostType } from './post.type';

export class PostDto {
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
}
