import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { BlockService } from 'src/modules/block/block.service';
import { IS_BLOCKED_KEY } from '../contants';
import { PostService } from 'src/modules/post/services';

export class BlockedUserInteractionGuard implements CanActivate {
  private logger = new Logger(BlockedUserInteractionGuard.name);

  constructor(
    private reflector: Reflector,
    private postService: PostService,
    private blockService: BlockService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isBlockedCheckingNeeded = this.reflector.getAllAndOverride<boolean>(
      IS_BLOCKED_KEY,
      [context.getClass(), context.getHandler()]
    );

    if (!isBlockedCheckingNeeded) return true;

    const request = context.switchToHttp().getRequest();
    // getting userId form the request
    const { id } = request.user;

    // getting userId form the request parameters
    const postId = request.params.postId;
    const post = await this.postService.findOne(postId);

    //todo check of the order of the parameters (blockerId , blockedId)
    this.logger.debug(
      `user from post ${post.userId} (suppose to be blocker) , user from token ${id} (suppose to be blocked)  , `
    );
    if (await this.blockService.isBlockedByUser(post.userId, id)) return false;
    return true;
  }
}
