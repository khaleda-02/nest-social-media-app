import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { COMMENT_REPOSITORY } from 'src/common/contants';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  private logger = new Logger(CommentService.name);
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: typeof Comment,
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

  async delete(PostId: number) {
    const deletedComment = await this.commentRepository.destroy({
      where: { PostId },
    });

    deletedComment
      ? this.logger.log(`comments deleted for post ${PostId}`)
      : new BadRequestException();
  }
}
