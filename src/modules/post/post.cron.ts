import { BaseCron } from '@base/cron.base';
import { EntityHelper } from '@module/core/helper/entity.helper';
import { PostInterface } from './post.interface';
import { Post } from './post.model';
import { PostRepository } from './post.repository';
import { PostScrapper } from './post.scrapper';
import { TRAVEL_POST_SCRAPPING_URL } from './scrapping/scrapping.url';

export class PostCron extends BaseCron {
    private postScrapper: PostScrapper;
    private postRepository: PostRepository;
    private entityHelper: EntityHelper;

    constructor() {
        super();
        this.postScrapper = new PostScrapper();
        this.postRepository = new PostRepository();
        this.entityHelper = new EntityHelper();

        this.addJob('Crawl Travel Posts', '* * * * *', async () => {
            const posts = await this.postScrapper.travelPostsScrapping();
            this.postRepository.bulkCreate(posts);
        });

        this.addJob('Crawl Travel Post content', '* * * * *', async () => {
            const posts = await this.postRepository.getCrawlPostsByCrawUrl(TRAVEL_POST_SCRAPPING_URL);

            for (let index = 0; index < posts.length; index++) {
                const post = posts[index];

                if (null !== post.url) {
                    const { author, content } = await this.postScrapper.getTravelPostContent(post.url);

                    this.entityHelper.updateValueIfChanged<PostInterface>(post, 'author', author);
                    this.entityHelper.updateValueIfChanged<PostInterface>(post, 'content', content);
                    post.save();
                }
            }
        });
    }
}
