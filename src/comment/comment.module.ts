import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.providers';
import { PostModule } from '../post/post.module';
import { ReplyModule } from 'src/reply/reply.module';
import { BlockModule } from 'src/block/block.module';

@Module({
  imports: [PostModule, ReplyModule, BlockModule],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders],
})
export class CommentModule {}
