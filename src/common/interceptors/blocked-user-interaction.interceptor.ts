import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { BlockService } from 'src/block/block.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class BlockedUserInteractionInterceptor implements NestInterceptor {
  private logger = new Logger(BlockedUserInteractionInterceptor.name);

  constructor(
    private postService: PostService,
    private blockService: BlockService
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    // getting userId form the request
    const { id } = request.user;

    // getting userId form the request parameters
    const postId = request.params.postId;
    const post = await this.postService.findOne(postId);

    //todo check of the order of the parameters (blockerId , blockedId)
    if (!(await this.blockService.isBlockedByUser(post.userId, id)))
      throw new BadRequestException(`User ${post.userId}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log('checking if the user is blocked');
      }),
      catchError((err) => {
        this.logger.log('rollback "checking if the user is blocked"');
        throw err;
      })
    );
  }
}
