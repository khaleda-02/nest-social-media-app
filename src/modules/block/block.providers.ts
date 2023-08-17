import { BLOCK_REPOSITORY } from 'src/common/contants';
import { Block } from './models/block.model';

export const blockProviders = [
  {
    provide: BLOCK_REPOSITORY,
    useValue: Block,
  },
];
