import { UserDto } from './user.dto';
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

    public async create(userDto: UserDto): Promise<UserResponseType> {
        const user = await this.userRepository.create(userDto);

        return {
            name: user.name,
            roles: user.roles,
        };
    }

    public async update(userId: number, userDto: UserDto): Promise<UserResponseType> {
        const currentUser = await this.userRepository.getUserById(userId);

        if (null === currentUser) {
            throw 'User not found';
        }

        const newUser = await this.userRepository.update(currentUser, userDto);

        return {
            name: newUser.name,
            email: newUser.email,
            roles: newUser.roles,
        };
    }
}
