import { SyncOptions } from 'sequelize';
import { User } from './models/user';

export const syncModels = async (options: SyncOptions) => {
    User.sync(options);
};
