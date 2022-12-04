import { Logger } from '@utils/logger';
import { CronJob } from 'cron';
import { DateTime } from 'luxon';

export type CronJobType = {
    name: string;
    job: CronJob;
};

export interface CronInterface {
    cronJobs: CronJobType[];
    logger: Logger;

    addJob: (jobName: string, time: string | Date | DateTime, callback: () => Promise<void>) => void;
    startAllJobs: () => void;
    startJob: (jobName: string) => void;
}
