import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.providers';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders],
})
export class CommentModule {}
