import { COMMENT_REPOSITORY } from 'src/common/contants';
import { Comment } from './entities/comment.entity';

export const commentProviders = [
  {
    provide: COMMENT_REPOSITORY,
    useValue: Comment,
  },
];
