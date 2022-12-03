import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';
import { Role } from '../type/role.type';

export class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare roles: Role;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        roles: {
            type: new DataTypes.ENUM(...Object.values(Role)),
            defaultValue: Role.guest,
            allowNull: false,
        },
    },
    {
        tableName: 'user',
        sequelize, // passing the `sequelize` instance is required
    }
);

// async function doStuffWithUserModel() {
//     const newUser = await User.create({
//         name: 'Johnny',
//         preferredName: 'John',
//     });
//     console.log(newUser.id, newUser.name, newUser.preferredName);

//     const foundUser = await User.findOne({ where: { name: 'Johnny' } });
//     if (foundUser === null) return;
//     console.log(foundUser.name);
// }
