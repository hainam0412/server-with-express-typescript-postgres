import { CreateUserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { UserResponseType } from './user.type';

export class UserMapper {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async findAll(): Promise<UserResponseType[]> {
        const users = await this.userRepository.findAll();

        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                roles: user.roles,
            };
        });
    }

    public async create(userDto: CreateUserDto): Promise<UserResponseType> {
        const user = await this.userRepository.create(userDto);

        return {
            name: user.name,
            roles: user.roles,
        };
    }
}
