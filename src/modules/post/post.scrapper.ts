import { BaseScrapper } from '@base/scrapper.base';
import { StringMapper } from '@module/core/mapper/string.mapper';
import { PostDto } from './post.dto';
import { PostRepository } from './post.repository';
import { PostType } from './post.type';
import { TRAVEL_POST_SCRAPPING_URL } from './scrapping/scrapping.url';

export class PostScrapper extends BaseScrapper {
    private postRepository: PostRepository;
    private stringMapper: StringMapper;

    constructor() {
        super();
        this.postRepository = new PostRepository();
        this.stringMapper = new StringMapper();
    }

    public async travelPostScrapping(): Promise<PostDto[]> {
        const $ = await this.getHtml(TRAVEL_POST_SCRAPPING_URL);
        const posts: PostDto[] = [];

        $('article.elementor-post.elementor-grid-item').each(async (index, item) => {
            const postElement = $(item);
            const url = postElement.find('.elementor-post__thumbnail__link').attr('href') || null;
            const title = postElement.find('.elementor-post__title').text().trim();

            if (null !== url && false === (await this.postRepository.checkExistsByUrlAndType(url, PostType.craw))) {
                posts.push({
                    title,
                    slug: this.stringMapper.slugMapperFromUrl(url, TRAVEL_POST_SCRAPPING_URL),
                    url,
                    content: '',
                    excerpt: '',
                    tag: [],
                    type: PostType.craw,
                });
            }
        });
        console.log(posts);

        return posts;
    }
}
