import { BaseCron } from '@base/cron.base';
import { PostRepository } from './post.repository';
import { PostScrapper } from './post.scrapper';

export class PostCron extends BaseCron {
    private postScrapper: PostScrapper;
    private postRepository: PostRepository;

    constructor() {
        super();
        this.postScrapper = new PostScrapper();
        this.postRepository = new PostRepository();

        this.addJob('Travel Post', '* * * * *', async () => {
            this.postRepository.bulkCreate(await this.postScrapper.travelPostScrapping());
        });
    }
}
