import { Logger } from '@utils/logger';
import { CronJob } from 'cron';
import { DateTime } from 'luxon';

export class BaseCron {
    public logger: Logger;
    public cronJobs: { name: string; job: CronJob }[] = [];

    constructor() {
        this.logger = new Logger();
    }

    public addJob(jobName: string, time: string | Date | DateTime, callback: () => Promise<void>) {
        this.cronJobs.push({
            name: jobName,
            job: new CronJob(time, async () => {
                try {
                    await callback();
                } catch (error) {
                    console.error(error);
                }
            }),
        });
    }

    public startAllJobs() {
        this.cronJobs.forEach(({ job, name }) => {
            if (!job.running) {
                this.logger.write('cron', `Start ${name} cron job`);
                job.start();
            }
        });
    }

    public startJob(jobName: string) {
        const currentJob = this.cronJobs.find((job) => job.name === jobName);

        if (!currentJob) {
            console.warn(`Cannot find job ${jobName}`);

            return;
        }

        currentJob.job.start();
    }
}
