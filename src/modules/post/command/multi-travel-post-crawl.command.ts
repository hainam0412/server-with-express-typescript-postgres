import { AbstractCommandLine } from '@module/console/abstract/command-line.abstract';
import { PostRepository } from '../repository/post.repository';
import { PostScrapper } from '../scrapper/post.scrapper';

export class MultiTravelPostCrawlCommand extends AbstractCommandLine {
    private postScrapper: PostScrapper;
    private postRepository: PostRepository;

    constructor() {
        super();
        this.postScrapper = new PostScrapper();
        this.postRepository = new PostRepository();

        this.program.command('post:crawl-multi-travel-blog').action(async () => {
            const posts = await this.postScrapper.travelPostsScrapping();
            await this.postRepository.bulkCreate(posts);

            console.log('Successfully crawling post data');
        });
    }
}
