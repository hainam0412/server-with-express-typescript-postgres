import { BaseMapper } from '@base/mapper.base';
import { UserDto } from './user.dto';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository';
import { UserResponseType } from './user.type';

export class UserMapper extends BaseMapper {
    private userRepository: UserRepository;

    constructor() {
        super();
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

    public async create(request: UserDto): Promise<UserResponseType> {
        try {
            const user = new UserModel();

            await this.setUserData(user, request);

            return {
                name: user.name,
                roles: user.roles,
            };
        } catch (error) {
            throw this.getErrorMessage(error);
        }
    }

    public async update(userId: number, request: UserDto): Promise<UserResponseType> {
        const currentUser = await this.userRepository.findById(userId);

        if (null === currentUser) {
            throw 'User not found';
        }

        try {
            await this.setUserData(currentUser, request);

            return {
                name: currentUser.name,
                email: currentUser.email,
                roles: currentUser.roles,
            };
        } catch (error) {
            throw this.getErrorMessage(error);
        }
    }

    private async setUserData(user: UserModel, request: UserDto): Promise<void> {
        user.name = request.name;
        user.email = request.email;
        user.setPassword(request.password);

        await user.save();
    }
}
