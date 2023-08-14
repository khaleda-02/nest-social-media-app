import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get('block/:userId')
  createBlock(
    @Param('userId', ParseIntPipe) blockedUserId: number,
    @User() user
  ) {
    return this.blockService.createBlock(user.id, blockedUserId);
  }

  @Get('unblock/:userId')
  unblock(@Param('userId', ParseIntPipe) blockedUserId: number, @User() user) {
    return this.blockService.unblock(user.id, blockedUserId);
  }
}
