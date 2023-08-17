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
import { UserIdentity } from 'src/common/decorators/user.decorator';
import { ParentType } from 'src/common/enums/reply-parent.enum';
import { BlockedChecking } from 'src/common/decorators/block.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

@UseInterceptors(TransactionInterceptor)
@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @BlockedChecking()
  @Post('posts/:postId/comments/:commentId')
  createReplyToComment(
    @Body() createReplyDto: CreateReplyDto,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @UserIdentity() user
  ) {
    return this.replyService.create(
      createReplyDto,
      user.id,
      commentId,
      ParentType.COMMENT
    );
  }

  @BlockedChecking()
  @Post('/:replyId/posts/:postId')
  createReplyToReply(
    @Body() createReplyDto: CreateReplyDto,
    @Param('replyId', ParseIntPipe) replyId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @UserIdentity() user
  ) {
    return this.replyService.create(
      createReplyDto,
      user.id,
      replyId,
      ParentType.REPLY
    );
  }
}
