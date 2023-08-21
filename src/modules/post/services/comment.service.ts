import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { COMMENT_REPOSITORY } from 'src/common/contants';
import { PostService } from './post.service';
import { CreateCommentDto } from '../dto';
import { Comment } from '../models';
import { Transaction } from 'sequelize';

@Injectable()
export class CommentService {
  private logger = new Logger(CommentService.name);
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: typeof Comment,

    @Inject(forwardRef(() => PostService))
    private postService: PostService
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    postId: number,
    userId: number
  ) {
    await this.postService.findOne(postId); // it will return an exception if the post is not found
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      userId,
      postId,
    });

    return comment.get({ plain: true });
  }

  async delete(postId: number, transaction: Transaction) {
    const deletedComment = await this.commentRepository.destroy({
      where: { postId },
      transaction,
    });

    deletedComment
      ? this.logger.log(`comments deleted for post ${postId}`)
      : new BadRequestException();
  }
}
