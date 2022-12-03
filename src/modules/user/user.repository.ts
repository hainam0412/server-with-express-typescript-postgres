import { Logger } from '@utils/logger';
import { CreateUserDto } from './user.dto';
import { UserRepositoryInterface } from './user.interface';
import { User } from './user.model';
import { BaseRepository } from '@base/repository.base';

export class UserRepository extends BaseRepository implements UserRepositoryInterface {
    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async delete(id: number): Promise<any> {}

    async getUserById(id: number): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            const user = new User();

            user.name = userDto.name;
            user.email = userDto.email;
            user.setPassword(userDto.password);
            await user.save();

            return user;
        } catch (error) {
            throw this.getErrorMessage(error);
        }
    }
}
