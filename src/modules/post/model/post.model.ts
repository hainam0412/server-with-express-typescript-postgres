import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@module/core/instance/sequelize-instance';
import { PostInput, PostInterface } from '../interface/post.interface';
import { PostType } from '../type/post.type';
import { Pattern } from '@type/pattern.type';

export class PostModel extends Model<PostInterface, PostInput> implements PostInterface {
    public id!: number;
    public title!: string;
    public slug!: string;
    public excerpt!: string;
    public content!: string;
    public author!: string;
    public tag!: string[];
    public type!: PostType;
    public url!: string | null;
    public crawUrl!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PostModel.init(
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
