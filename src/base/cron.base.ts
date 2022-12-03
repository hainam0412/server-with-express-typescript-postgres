import { Logger } from '@utils/logger';
import { CronJob } from 'cron';
import { DateTime } from 'luxon';

export class BaseCron {
    public logger: Logger;

    private cronJob: CronJob;

    constructor() {
        this.logger = new Logger();
    }

    public createJob(time: string | Date | DateTime, callback: () => Promise<void>) {
        this.cronJob = new CronJob(time, async () => {
            try {
                await callback();
            } catch (error) {
                console.error(error);
            }
        });
    }

    public startJob() {
        if (!this.cronJob.running) {
            this.logger.write('cron', 'Start scrapping travel blogs');
            this.cronJob.start();
        }
    }
}
