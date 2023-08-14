import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { ReplyService } from './reply.service';
import { User } from '../common/decorators/user.decorator';
import { ParentType } from '../common/enums/reply-parent.enum';
import { BlockedUserInteractionInterceptor } from 'src/common/interceptors/blocked-user-interaction.interceptor';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseInterceptors(BlockedUserInteractionInterceptor)
  @Post('posts/:postId/comments/:commentId')
  createReplyToComment(
    @Body() createReplyDto: CreateReplyDto,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @User() user
  ) {
    return this.replyService.create(
      createReplyDto,
      user.id,
      commentId,
      ParentType.COMMENT
    );
  }
  @UseInterceptors(BlockedUserInteractionInterceptor)
  @Post('/:replyId/posts/:postId')
  createReplyToReply(
    @Body() createReplyDto: CreateReplyDto,
    @Param('replyId', ParseIntPipe) replyId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @User() user
  ) {
    return this.replyService.create(
      createReplyDto,
      user.id,
      replyId,
      ParentType.REPLY
    );
  }
}
