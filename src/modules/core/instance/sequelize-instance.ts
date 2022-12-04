import { ENV_VAR } from '../../../env';
import { Sequelize } from 'sequelize';
import { Logger } from '../../../utils/logger';

const logger = new Logger();

export const sequelize = new Sequelize(ENV_VAR.DB, {
    logging: (message) => {
        logger.write('db', message);
    },
});
