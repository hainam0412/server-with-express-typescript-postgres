import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@module/core/instance/sequelize-instance';
import { Role } from '@type/role.type';
import { UserInput, UserInterface } from '../interface/user.interface';
import crypto from 'crypto';

export class UserModel extends Model<UserInterface, UserInput> implements UserInterface {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public salt!: string;
    public roles!: Role;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public validPassword(password: string): boolean {
        return this.password === crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }

    public setPassword(value: string) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto.pbkdf2Sync(value, this.salt, 10000, 64, 'sha512').toString('hex');
    }
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        roles: {
            type: new DataTypes.ENUM(...Object.values(Role)),
            defaultValue: Role.guest,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
    },
    {
        tableName: 'user',
        sequelize, // passing the `sequelize` instance is required
    }
);
