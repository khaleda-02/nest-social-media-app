import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { REPLY_REPOSITORY } from 'src/common/contants';
import { ParentType } from 'src/common/enums/reply-parent.enum';

@Injectable()
export class ReplyService {
  private logger = new Logger(ReplyService.name);
  constructor(
    @Inject(REPLY_REPOSITORY)
    private replyRepository
  ) {}

  async create(
    createReplyDto: CreateReplyDto,
    userId: number,
    parentId: number,
    parentType: ParentType
  ) {
    return await this.replyRepository.create({
      ...createReplyDto,
      userId,
      parentId,
      parentType,
    });
  }

  async delete(postId: number) {
    const deletedReplies = await this.replyRepository.destroy({
      // where: { parentType :  },
    });

    deletedReplies
      ? this.logger.log(`comments deleted for post ${postId}`)
      : new BadRequestException();
  }
}
