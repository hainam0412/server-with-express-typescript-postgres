import { Logger } from '@utils/logger';

export class BaseRepository {
    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    public getErrorMessage(error: any) {
        this.logger.write('db', JSON.stringify(error));

        throw error.errors[0].message;
    }
}
