import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/common/contants';
import { Block } from 'src/modules/block/models/block.model';
import { Post } from 'src/modules/post/models/post.model';
import { Reply } from 'src/modules/reply/models/reply.model';
import { Comment } from '../post/models';
import { User } from '../user/models/user.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const config = configService.get('database');
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post, Comment, Reply, Block]);
      return sequelize;
    },

    inject: [ConfigService],
  },
];
