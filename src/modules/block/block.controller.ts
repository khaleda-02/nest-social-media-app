import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { UserIdentity } from 'src/common/decorators/user.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

@UseInterceptors(TransactionInterceptor)
@Controller('')
export class BlockController {
  private logger = new Logger(BlockController.name);
  constructor(private readonly blockService: BlockService) {}

  @Get('block/:userId')
  createBlock(
    @Param('userId', ParseIntPipe) blockedUserId: number,
    @UserIdentity() user
  ) {
    this.logger.log(
      `user from params (blockedUserId: ${blockedUserId}) , user from token(blocker) : ${user.id}`
    );
    return this.blockService.createBlock(user.id, blockedUserId);
  }

  @Get('unblock/:userId')
  unblock(
    @Param('userId', ParseIntPipe) blockedUserId: number,
    @UserIdentity() user
  ) {
    return this.blockService.unblock(user.id, blockedUserId);
  }
}
