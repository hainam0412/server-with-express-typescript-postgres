import { CreateUserDto } from './user.dto';
import { UserRepositoryInterface } from './user.interface';
import { User } from './user.model';

export class UserRepository implements UserRepositoryInterface {
    async findAll(t: User): Promise<User[]> {
        return await User.findAll();
    }

    async delete(t: User): Promise<any> {}

    async getUserById(id: number): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }

    async create(userDto: CreateUserDto): Promise<any> {
        const user = new User();

        user.name = userDto.name;
        user.email = userDto.email;
        user.setPassword(userDto.password);

        return user.save();
    }
}
