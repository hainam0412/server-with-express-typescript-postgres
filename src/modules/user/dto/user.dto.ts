import { Role } from '@type/role.type';
import { UserInterface } from '../interface/user.interface';

export class UserDto implements UserInterface {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public roles: Role;
    public salt: string;
}
