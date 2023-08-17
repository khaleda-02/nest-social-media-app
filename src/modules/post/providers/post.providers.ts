import { POST_REPOSITORY } from 'src/common/contants';
import moment from 'moment';
import { Post } from '../models';

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
