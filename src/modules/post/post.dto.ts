import { IsString, IsArray } from 'class-validator';

export class PostDto {
    @IsString()
    public id: number;

    @IsString()
    public title: string;

    @IsString()
    public excerpt: string;

    @IsString()
    public content: string;

    @IsString()
    public author: string;

    @IsArray()
    public tag: string[];
}
