import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlockService } from 'src/modules/block/block.service';
import { PostService } from 'src/modules/post/services';

@Injectable()
export class CommonService {
  constructor(
    private readonly postService: PostService,
    private readonly blockService: BlockService
  ) {}

  getPostService(): PostService {
    return this.postService;
  }

  getBlockService(): BlockService {
    return this.blockService;
  }
}
