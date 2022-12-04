import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@module/sequelize-instance';
import { PostInterface } from './post.interface';
import { PostType } from './post.type';
import { Pattern } from '@type/pattern.type';

export class Post extends Model implements PostInterface {
    declare id: number;
    declare title: string;
    declare slug: string;
    declare excerpt: string;
    declare content: string;
    declare author: string;
    declare tag: string[];
    declare type: PostType;
    declare url: string | null;
    declare crawUrl: string | null;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        slug: {
            type: new DataTypes.STRING(256),
            allowNull: false,
            validate: {
                is: Pattern.slug,
            },
            unique: true,
        },
        excerpt: {
            type: new DataTypes.STRING(256),
            allowNull: true,
        },
        content: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
        author: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            defaultValue: 'anonymous',
        },
        tag: {
            type: new DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: null,
        },
        type: {
            type: new DataTypes.ENUM(...Object.values(PostType)),
            allowNull: false,
            defaultValue: PostType.default,
        },
        url: {
            type: new DataTypes.STRING(),
            allowNull: true,
            defaultValue: null,
        },
        crawUrl: {
            type: new DataTypes.STRING(),
            allowNull: true,
            defaultValue: null,
            validate: {
                isUrl: true,
            },
        },
    },
    {
        tableName: 'post',
        sequelize,
    }
);
