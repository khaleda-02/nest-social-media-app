import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserIdentity } from 'src/common/decorators/user.decorator';
import { BlockedUserInteractionGuard } from 'src/common/guards/blocked-user-interaction.guard';
import { User as userType } from '../user/entities/user.entity';
import { BlockedChecking } from 'src/common/decorators/block.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

@UseInterceptors(TransactionInterceptor)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @BlockedChecking()
  @Post('posts/:postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @UserIdentity() user: userType
  ) {
    return this.commentService.create(createCommentDto, postId, user.id);
  }
}
