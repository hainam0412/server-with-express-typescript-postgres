import { SyncOptions } from 'sequelize';
import { User } from '@user/user.model';
import { Post } from '@module/post/post.model';

export const syncModels = async (options: SyncOptions = {}) => {
    await User.sync(options);
    await Post.sync(options);
};
