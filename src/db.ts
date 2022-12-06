import { SyncOptions } from 'sequelize';
import { UserModel } from '@module/user/model/user.model';
import { PostModel } from '@module/post/post.model';

export const syncModels = async (options: SyncOptions = {}) => {
    await UserModel.sync(options);
    await PostModel.sync(options);
};
