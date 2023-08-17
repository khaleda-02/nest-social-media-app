import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserIdentity } from 'src/common/decorators/user.decorator';
import { BlockedChecking } from 'src/common/decorators/block.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { CommentService } from '../services';
import { CreateCommentDto } from '../dto';

@UseInterceptors(TransactionInterceptor)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @BlockedChecking()
  @Post('posts/:postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @UserIdentity() user
  ) {
    return this.commentService.create(createCommentDto, postId, user.id);
  }
}
