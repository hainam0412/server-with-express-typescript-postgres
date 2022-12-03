import { Role } from '@type/role.type';
import { IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
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
