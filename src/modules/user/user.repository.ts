import { UserRepositoryInterface } from './user.interface';
import { UserModel } from './user.model';
import { BaseRepository } from '@base/repository.base';

export class UserRepository extends BaseRepository implements UserRepositoryInterface {
    async findAll(): Promise<UserModel[]> {
        return await UserModel.findAll();
    }

    async delete(id: number): Promise<any> {}

    async findById(id: number): Promise<UserModel | null> {
        return await UserModel.findOne({ where: { id } });
    }
}
