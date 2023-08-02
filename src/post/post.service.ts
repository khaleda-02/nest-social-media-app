import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_REPOSITORY } from '../common/contants';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';

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

  findAll(userId: number) {
    return `This action returns all post`;
  }

  update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    return `This action updates a #${id} post`;
  }

  remove(id: number, userId: number) {
    return `This action removes a #${id} post`;
  }
}
