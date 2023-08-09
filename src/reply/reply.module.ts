import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { replyProviders } from './reply.providers';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService, ...replyProviders],
  exports: [ReplyService],
})
export class ReplyModule {}
