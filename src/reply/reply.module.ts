import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { replyProviders } from './reply.providers';
import { PostModule } from 'src/post/post.module';
import { BlockModule } from 'src/block/block.module';

@Module({
  imports: [PostModule, BlockModule],
  controllers: [ReplyController],
  providers: [ReplyService, ...replyProviders],
  exports: [ReplyService],
})
export class ReplyModule {}
