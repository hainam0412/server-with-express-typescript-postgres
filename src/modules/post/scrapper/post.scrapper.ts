import { BaseScrapper } from '@base/scrapper.base';
import { StringMapper } from '@module/core/mapper/string.mapper';
import { ArrayUtils } from '@utils/array';
import { PostDto } from '../dto/post.dto';
import { PostRepository } from '../repository/post.repository';
import { PostType } from '../type/post.type';
import { TRAVEL_POST_SCRAPPING_URL } from './scrapping.url';

export class PostScrapper extends BaseScrapper {
    private postRepository: PostRepository;
    private stringMapper: StringMapper;
    private arrayUtils: ArrayUtils;

    constructor() {
        super();
        this.postRepository = new PostRepository();
        this.stringMapper = new StringMapper();
        this.arrayUtils = new ArrayUtils();
    }

    public async travelPostsScrapping(): Promise<PostDto[]> {
        const $ = await this.getHtml(TRAVEL_POST_SCRAPPING_URL);
        const posts: PostDto[] = [];

        $('article.elementor-post.elementor-grid-item').each(async (index, item) => {
            const postElement = $(item);
            const url = postElement.find('.elementor-post__thumbnail__link').attr('href') || null;
            const title = postElement.find('.elementor-post__title').text().trim();

            if (null !== url) {
                posts.push({
                    title,
                    slug: this.stringMapper.slugMapperFromUrl(url, TRAVEL_POST_SCRAPPING_URL),
                    url,
                    content: '',
                    excerpt: '',
                    tag: [],
                    type: PostType.crawl,
                    crawUrl: TRAVEL_POST_SCRAPPING_URL,
                });
            }
        });

        return await this.arrayUtils.asyncFilter<PostDto>(posts, async (post) => {
            return false === (await this.postRepository.checkExistsByUrlAndType(post.url as string, PostType.crawl));
        });
    }

    public async getTravelPostContent(postUrl: string): Promise<{ author: string; content: string }> {
        const $ = await this.getHtml(postUrl);

        const author = $('.ast-single-post-order .author-name').text().trim();
        const content = $('article .entry-content').remove('.sharedaddy.sd-sharing-enabled').remove('.jp-relatedposts').remove('.ss-inline-share-wrapper').html() || '';

        return {
            author,
            content: this.stringMapper.safeStringMapper(content),
        };
    }
}
