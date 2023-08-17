import { POST_REPOSITORY } from 'src/common/contants';
import { Post } from './entities/post.entity';
import moment from 'moment';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
  {
    provide: 'MomentWrapper',
    useValue: moment,
  },
];
