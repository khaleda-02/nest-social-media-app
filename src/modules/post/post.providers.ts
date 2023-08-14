import { POST_REPOSITORY } from 'src/common/contants';
import { Post } from './entities/post.entity';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
