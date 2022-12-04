import { UserController } from '@module/user/user.controller';
import { PostController } from '@module/post/post.controller';

export const APP_CONTROLLERS = [new UserController(), new PostController()];
