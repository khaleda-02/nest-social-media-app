import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { BLOCK_REPOSITORY } from 'src/common/contants';
import { Block } from './entities/block.entity';

@Injectable()
export class BlockService {
  private logger = new Logger(BlockService.name);
  constructor(
    @Inject(BLOCK_REPOSITORY)
    private blockRepository: typeof Block
  ) {}
  //Todo ask : do I need to chek if the blockedUserId is actually a user . or not and the foreign key does the checking .
  async createBlock(blockerUserId: number, blockedUserId: number) {
    if (blockedUserId === blockerUserId)
      throw new BadRequestException(`can't block yourself dump `);

    const blockExists = await this.blockRepository.findOne({
      where: { blockerUserId, blockedUserId },
    });

    if (blockExists)
      throw new BadRequestException(`Block ${blockedUserId} already blocked`);

    const block = await this.blockRepository.create({
      blockedUserId,
      blockerUserId,
    });
    return block
      ? `user ${blockedUserId} has blocked successfly `
      : new BadRequestException();
  }

  async unblock(blockerUserId: number, blockedUserId: number) {
    const blockExists = await this.blockRepository.findOne({
      where: { blockerUserId, blockedUserId },
    });

    if (!blockExists)
      throw new BadRequestException(`can't unblock user : ${blockedUserId} `);

    const block = await this.blockRepository.destroy({
      where: { blockedUserId, blockerUserId },
    });

    return block
      ? `user ${blockedUserId} has blocked successfly `
      : new BadRequestException();
  }

  async isBlockedByUser(
    blockerUserId: number,
    blockedUserId: number
  ): Promise<boolean> {
    const blockExists = await this.blockRepository.findOne({
      where: { blockerUserId, blockedUserId },
    });

    this.logger.log(
      blockExists
        ? `user with id : ${blockerUserId} , blocking user with id: ${blockedUserId}`
        : `no blocking relation between users : ${blockerUserId} and ${blockedUserId}`
    );
    return blockExists ? true : false;
  }
}