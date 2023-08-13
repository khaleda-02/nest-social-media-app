import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/common/decorators/user.decorator';
import { User as userType } from 'src/user/entities/user.entity';
import { BlockedUserInteractionGuard } from 'src/common/guards/blocked-user-interaction.guard';
import { PostService } from 'src/post/post.service';
import { BlockService } from 'src/block/block.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(BlockedUserInteractionGuard)
  @Post('posts/:postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User() user: userType
  ) {
    return this.commentService.create(createCommentDto, postId, user.id);
  }
}
