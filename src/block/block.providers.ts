import { BLOCK_REPOSITORY } from 'src/common/contants';
import { Block } from './entities/block.entity';

export const blockProviders = [
  {
    provide: BLOCK_REPOSITORY,
    useValue: Block,
  },
];
