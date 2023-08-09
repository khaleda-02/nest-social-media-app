import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_REPOSITORY } from '../common/contants';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Transaction } from 'sequelize';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private postRepository: typeof Post,
    private userService: UserService
  ) {}

  async create(
    createPostDto: CreatePostDto,
    { username }: User
  ): Promise<Post> {
    //! getting the user using findOne rather than getting the usr from the User decorator ,
    //! because the user from the decorator comes from the token (the data does not change when incrementing)
    //? when getting the user from the decorator and then incrementing the postCreatiedToday , it increments it in db but not update the data in the token
    const user = await this.userService.findOne(username);

    if (!this.userService.canCreate(user))
      throw new BadRequestException('you exceeded the maximum number of posts');

    const post = await this.postRepository.create({
      ...createPostDto,
      userId: user.id,
    });

    await this.userService.incrementPostCreated(user);
    return post;
  }

  async findAll(userId: number) {
    const lastestPosts = await this.postRepository.findAll({
      limit: 500,
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    const shuffledArray = this.shuffleArray(lastestPosts);
    return shuffledArray.slice(0, 100);
  }

  async findOne(id: number): Promise<Post | undefined> {
    const post = await this.postRepository.findByPk(id);
    // ? implement the exception here or in comment serevice
    // if (!post) throw new NotFoundException('post not found');
    return post ? post.get({ plain: true }) : undefined;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
    transaction: Transaction
  ) {
    const [_, effectedRows] = await this.postRepository.update(
      { ...updatePostDto, isEdited: true },
      { where: { userId, id }, returning: true, transaction }
    );

    if (!effectedRows)
      throw new BadRequestException(
        'not found post , or this post not belong to this user '
      );
    return `succeflly updated ${id} post`;
  }

  async remove(id: number, userId: number) {
    const effectedRows = await this.postRepository.destroy({
      where: { id, userId, numOfWatchers: 0 },
    });
    if (!effectedRows)
      throw new BadRequestException(
        "not found post , or this post not belong to this user , or can't be deleted"
      );
    return `succeflly deleted ${id} post`;
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
}
