import { Logger } from '@utils/logger';

export class BaseMapper {
    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    public getErrorMessage(error: any) {
        this.logger.write('db', JSON.stringify(error));
        if ('ERR_INVALID_ARG_TYPE' === error.code) {
            throw 'Wrong parameter';
        }

        throw error.errors[0].message;
    }
}
