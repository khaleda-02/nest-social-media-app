import { REPLY_REPOSITORY } from 'src/common/contants';
import { Reply } from './models/reply.model';

export const replyProviders = [
  {
    provide: REPLY_REPOSITORY,
    useValue: Reply,
  },
];
