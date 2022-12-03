import { Role } from '@type/role.type';
import { User } from './user.model';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
    getUserById(id: number): Promise<User | null>;
}

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: Role;

    validPassword: (password: string) => boolean;
    setPassword: (password: string) => void;
}
