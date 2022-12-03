import { SyncOptions } from 'sequelize';
import { User } from '@user/user.model';

export const syncModels = async (options: SyncOptions = {}) => {
    User.sync(options);
};
