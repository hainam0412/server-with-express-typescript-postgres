import { PostCron } from '@module/post/post.cron';

const JOBS = [new PostCron()];

export const startCronJob = () => {
    JOBS.forEach((job) => {
        job.startAllJobs();
    });
};
