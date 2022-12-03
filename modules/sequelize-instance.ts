import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { resolve } from 'path';

config({
    path: resolve(__dirname, '../../.env'),
});

export const sequelize = new Sequelize(process.env.DB as string, {
    logging: (...msg) => console.log(msg),
});
