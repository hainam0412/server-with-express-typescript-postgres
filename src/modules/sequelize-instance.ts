import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { resolve } from 'path';
import { Logger } from '../utils/logger';

config({
    path: resolve(__dirname, '../../.env'),
});

const logger = new Logger();

export const sequelize = new Sequelize(process.env.DB as string, {
    logging: (message) => {
        logger.write('db', message);
    },
});
