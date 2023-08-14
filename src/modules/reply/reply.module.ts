import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { replyProviders } from './reply.providers';
import { BlockModule } from '../block/block.module';
import { PostModule } from '../post/post.module';
@Module({
  imports: [PostModule, BlockModule],
  controllers: [ReplyController],
  providers: [ReplyService, ...replyProviders],
  exports: [ReplyService],
})
export class ReplyModule {}
