import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@module/sequelize-instance';
import { PostInterface } from './post.interface';

export class Post extends Model implements PostInterface {
    declare id: number;
    declare title: string;
    declare excerpt: string;
    declare content: string;
    declare author: string;
    declare tag: string[];
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
    },
    {
        tableName: 'post',
        sequelize,
    }
);
