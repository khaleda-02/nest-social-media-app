import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { TransactionDecorator } from 'src/common/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { UserIdentity } from 'src/common/decorators/user.decorator';
import { PostService } from '../services';
import { CreatePostDto, UpdatePostDto } from '../dto';

@UseInterceptors(TransactionInterceptor)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @UserIdentity() user) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll(@UserIdentity() user) {
    return this.postService.findAll(user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserIdentity() user,
    @TransactionDecorator() transaction: Transaction
  ) {
    return this.postService.update(+id, updatePostDto, user.id, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserIdentity() user) {
    return this.postService.remove(+id, user.id);
  }
}
