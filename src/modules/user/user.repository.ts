import { UserDto } from './user.dto';
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

    async create(userDto: UserDto): Promise<User> {
        try {
            const user = new User();
            await this.setUserData(user, userDto);

            return user;
        } catch (error) {
            throw this.getErrorMessage(error);
        }
    }

    async update(user: User, userDto: UserDto): Promise<User> {
        try {
            await this.setUserData(user, userDto);

            return user;
        } catch (error) {
            throw this.getErrorMessage(error);
        }
    }

    private async setUserData(user: User, userDto: UserDto): Promise<void> {
        user.name = userDto.name;
        user.email = userDto.email;
        user.setPassword(userDto.password);
        await user.save();
    }
}
