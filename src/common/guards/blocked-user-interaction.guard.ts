import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from 'src/modules/post/post.service';

export class BlockedUserInteractionGuard implements CanActivate {
  constructor(
    private postService: PostService
  ) // private blockService: BlockService
  {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('in block guard ');
    console.log(this.postService, 'insdfs');

    const request = context.switchToHttp().getRequest();
    const { id } = request.user;
    const postId = request.params.postId;
    console.log('postId from request ', postId);
    console.log('userId from authguard (in req)', request.user);
    const post = await this.postService.findOne(postId);
    console.log('post from post service ', post);

    // const isBlocked=
    return false;
  }
}
