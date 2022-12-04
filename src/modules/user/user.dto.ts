import { Role } from '@type/role.type';
import { IsString, IsEnum } from 'class-validator';
import { UserInterface } from './user.interface';

export class UserDto implements UserInterface {
    @IsString()
    public id: number;

    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsEnum(Role)
    public roles: Role;

    @IsString()
    public salt: string;
}
