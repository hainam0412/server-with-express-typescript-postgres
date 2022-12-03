import axios from 'axios';
import cheerio from 'cheerio';

export class BaseScrapper {
    async getHtml(url: string) {
        const response = await axios.get(url);
        const html = response.data;

        return cheerio.load(html);
    }
}
