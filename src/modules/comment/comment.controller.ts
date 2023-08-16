import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/common/decorators/user.decorator';
import { BlockedUserInteractionGuard } from 'src/common/guards/blocked-user-interaction.guard';
import { BlockedUserInteractionInterceptor } from 'src/common/interceptors/blocked-user-interaction.interceptor';
import { User as userType } from '../user/entities/user.entity';
import { Block } from 'src/common/decorators/block.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // @UseInterceptors(BlockedUserInteractionInterceptor)
  @Block()
  @Post('posts/:postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() user: userType
  ) {
    return this.commentService.create(createCommentDto, postId, user.id);
  }
}
