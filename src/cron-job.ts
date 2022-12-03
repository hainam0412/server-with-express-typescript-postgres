import { PostCron } from '@module/post/post.cron';

export const startCronJob = () => {
    const postCron = new PostCron();
    postCron.startJob();
};
