import { SetMetadata } from '@nestjs/common';
import { IS_BLOCKED_KEY } from '../contants';

export const Block = () => SetMetadata(IS_BLOCKED_KEY, true);
