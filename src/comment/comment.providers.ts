import { COMMENT_REPOSITORY } from '../common/contants';
import { Comment } from './entities/comment.entity';

export const commentProviders = [
  {
    provide: COMMENT_REPOSITORY,
    useValue: Comment,
  },
];
