import { Role } from '@type/role.type';
import { Optional } from 'sequelize';
import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface extends RepositoryInterface<UserModel> {}

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    salt: string;
    password: string;
    roles: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInput extends Optional<UserInterface, 'id' | 'roles'> {}
export interface UserOutput extends Required<UserInterface> {}
