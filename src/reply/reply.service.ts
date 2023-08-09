import { Inject, Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { ParentType } from '../common/enums/reply-parent.enum';
import { REPLY_REPOSITORY } from '../common/contants';

@Injectable()
export class ReplyService {
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

}
