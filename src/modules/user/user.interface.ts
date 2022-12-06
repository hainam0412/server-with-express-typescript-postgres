import { Role } from '@type/role.type';
import { User } from './user.model';

export interface UserRepositoryInterface extends RepositoryInterface<User> {}

export interface UserInterface {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly roles: Role;
}
