import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@module/sequelize-instance';
import { Role } from '@type/role.type';
import { UserInterface } from './user.interface';
import crypto from 'crypto';

export class User extends Model implements UserInterface {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare roles: Role;
    private salt: string;

    public validPassword(password: string): boolean {
        return this.password === crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }

    public setPassword(password: string): void {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    }
}

User.init(
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
