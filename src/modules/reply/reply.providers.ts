import { REPLY_REPOSITORY } from 'src/common/contants';
import { Reply } from './entities/reply.entity';

export const replyProviders = [
  {
    provide: REPLY_REPOSITORY,
    useValue: Reply,
  },
];
