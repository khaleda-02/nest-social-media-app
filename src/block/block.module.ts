import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { blockProviders } from './block.providers';

@Module({
  controllers: [BlockController],
  providers: [BlockService, ...blockProviders],
})
export class BlockModule {}
