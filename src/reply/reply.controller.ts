import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { ReplyService } from './reply.service';
import { User } from '../common/decorators/user.decorator';
import { ParentType } from '../common/enums/reply-parent.enum';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('comments/:commentId')
  createReplyToComment(
    @Body() createReplyDto: CreateReplyDto,
    @Param('commentId', ParseIntPipe) commentId: number,
    @User() user
  ) {
    return this.replyService.create(
      createReplyDto,
      user.id,
      commentId,
      ParentType.COMMENT
    );
  }

  @Post('/:replyId')
  createReplyToReply(
    @Body() createReplyDto: CreateReplyDto,
    @Param('replyId', ParseIntPipe) replyId: number,
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
