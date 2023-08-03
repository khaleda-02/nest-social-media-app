import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { COMMENT_REPOSITORY } from 'src/common/contants';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
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
    if (!(await this.postService.findOne(postId)))
      throw new BadRequestException('post not found');

    const comment = await this.commentRepository.create({
      ...createCommentDto,
      userId,
      postId,
    });

    return comment.get({ plain: true });
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
