import { BaseScrapper } from '@base/scrapper.base';
import { PostDto } from './post.dto';
import { PostType } from './post.type';
import { TRAVEL_POST_SCRAPPING_URL } from './scrapping/scrapping.url';

export class PostScrapper extends BaseScrapper {
    public async travelPostScrapping(): Promise<PostDto[]> {
        const $ = await this.getHtml(TRAVEL_POST_SCRAPPING_URL);
        const posts: PostDto[] = [];

        $('article.elementor-post.elementor-grid-item').each((index, item) => {
            const postElement = $(item);

            const url = postElement.find('.elementor-post__thumbnail__link').attr('href') || null;
            const title = postElement.find('.elementor-post__title').text().trim();
            posts.push({
                title,
                url,
                content: '',
                excerpt: '',
                author: 'anonymous',
                tag: [],
                type: PostType.craw,
            });
        });

        return posts;
    }
}
