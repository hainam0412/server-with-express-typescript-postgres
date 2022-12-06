import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@module/core/instance/sequelize-instance';
import { Role } from '@type/role.type';
import { UserInterface } from './user.interface';
import crypto from 'crypto';

export class User extends Model implements UserInterface {
    private _id: number;
    public get id(): number {
        return this._id;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._salt = crypto.randomBytes(16).toString('hex');
        this._password = crypto.pbkdf2Sync(value, this._salt, 10000, 64, 'sha512').toString('hex');
    }

    private _roles: Role;
    public get roles(): Role {
        return this._roles;
    }
    public set roles(value: Role) {
        this._roles = value;
    }

    private _salt: string;
    public get salt(): string {
        return this._salt;
    }
    public set salt(value: string) {
        this._salt = value;
    }

    public validPassword(password: string): boolean {
        return this._password === crypto.pbkdf2Sync(password, this._salt, 10000, 512, 'sha512').toString('hex');
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
