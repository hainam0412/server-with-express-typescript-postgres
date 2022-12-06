import { UserRepositoryInterface } from './user.interface';
import { User } from './user.model';
import { BaseRepository } from '@base/repository.base';

export class UserRepository extends BaseRepository implements UserRepositoryInterface {
    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async delete(id: number): Promise<any> {}

    async findById(id: number): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }
}
