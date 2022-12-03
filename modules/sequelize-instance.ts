import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB as string, {
    logging: (...msg) => console.log(msg),
});
