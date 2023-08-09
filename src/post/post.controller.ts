import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../common/decorators/user.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { TransactionDecorator } from 'src/common/decorators/transaction.decorator';
import { Transaction } from 'sequelize';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() user) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll(@User() user) {
    return this.postService.findAll(user.id);
  }

  @UseInterceptors(TransactionInterceptor)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user,
    @TransactionDecorator() transaction : Transaction
  ) {
    return this.postService.update(+id, updatePostDto, user.id, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.postService.remove(+id, user.id);
  }
}
