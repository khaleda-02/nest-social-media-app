import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { commentProviders, postProviders } from './providers';
import { CommentController, PostController } from './controllers';
import { CommentService, PostService } from './services';
import { BlockModule } from '../block/block.module';

@Module({
  imports: [UserModule, BlockModule],
  controllers: [PostController, CommentController],
  providers: [
    PostService,
    CommentService,
    ...postProviders,
    ...commentProviders,
  ],
  exports: [PostService],
})
export class PostModule {}
