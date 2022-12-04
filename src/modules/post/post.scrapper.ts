import { BaseScrapper } from '@base/scrapper.base';
import { StringMapper } from '@module/core/mapper/string.mapper';
import { ArrayUtils } from '@utils/array';
import { PostDto } from './post.dto';
import { PostRepository } from './post.repository';
import { PostType } from './post.type';
import { TRAVEL_POST_SCRAPPING_URL } from './scrapping/scrapping.url';

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

    public async travelPostScrapping(): Promise<PostDto[]> {
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
                    type: PostType.craw,
                    crawUrl: TRAVEL_POST_SCRAPPING_URL,
                });
            }
        });

        return await this.arrayUtils.asyncFilter<PostDto>(posts, async (post) => {
            return false === (await this.postRepository.checkExistsByUrlAndType(post.url as string, PostType.craw));
        });
    }
}
