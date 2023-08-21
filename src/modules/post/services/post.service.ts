import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { POST_REPOSITORY } from 'src/common/contants';
import { Op } from 'sequelize';
import { UserService } from 'src/modules/user/user.service';
import { CommentService } from './comment.service';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { User } from 'src/modules/user/models/user.model';
import { Post } from '../models';
import * as moment from 'moment';

@Injectable()
export class PostService {
  private logger = new Logger(PostService.name);
  constructor(
    @Inject(POST_REPOSITORY)
    private postRepository,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  async create(
    createPostDto: CreatePostDto,
    { username }: User,
    transaction: Transaction
  ): Promise<Post> {
    const user = await this.userService.findOne(username);

    const canCreate = await this.canCreate(user.id);
    if (!canCreate)
      throw new BadRequestException('you exceeded the maximum number of posts');

    const post = await this.postRepository.create(
      {
        ...createPostDto,
        userId: user.id,
      },
      { transaction }
    );

    return post;
  }

  async findAll(userId: number, pageNum: number, limit: number) {
    const offset = (pageNum - 1) * limit;
    return await this.postRepository.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      // raw: true,
    });
  }

  async findOne(id: number): Promise<Post | undefined> {
    const post = await this.postRepository.findByPk(id);
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
    transaction: Transaction
  ) {
    const post = await this.postRepository.findOne({
      where: { userId, id },
    });

    if (!post)
      throw new BadRequestException(
        'not found post , or this post not belong to this user '
      );

    await post.update(
      { ...updatePostDto, isEdited: true, updatedAt: new Date() },
      { transaction }
    );

    return `succeflly updated ${id} post`;
  }

  async remove(id: number, userId: number, transaction: Transaction) {
    const post = await this.postRepository.findOne({
      where: { id, userId },
    });

    if (!post) {
      throw new NotFoundException(
        'Post not found or does not belong to the user.'
      );
    }

    if (post.numOfWatchers > 0) {
      throw new BadRequestException('Cannot delete a post with watchers.');
    }

    await post.destroy({ transaction });
    await this.commentService.delete(id, transaction);
    return `Successfully deleted post with ID ${id}.`;
  }

  //! Helper Methods
  private shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  async incrementNumOfWatchers(postId: number): Promise<Post | undefined> {
    const post = await this.postRepository.findByPk(postId);
    if (!post) return undefined;

    post.numOfWatchers += 1;
    await post.save();
    return post;
  }

  async canCreate(id: number): Promise<boolean> {
    const createdPostForToday = await this.postRepository.count({
      where: {
        userId: id,
        createdAt: {
          [Op.gte]: moment.utc().startOf('day').local().toISOString(),
        },
      },
    });
    this.logger.log(`createdPostForToday ${createdPostForToday}`);
    return createdPostForToday < 5;
  }
}
