import { Logger } from '@utils/logger';
import axios from 'axios';
import cheerio from 'cheerio';

export class BaseScrapper {
    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    async getHtml(url: string) {
        try {
            const response = await axios.get(url);
            const html = response.data;

            return cheerio.load(html);
        } catch (error) {
            this.logger.write('server', error as string);

            throw error;
        }
    }
}
