import { Role } from '@type/role.type';
import { User } from './user.model';

export interface UserRepositoryInterface extends RepositoryInterface<User> {
    getUserById(id: number): Promise<User | null>;
}

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: Role;
}
