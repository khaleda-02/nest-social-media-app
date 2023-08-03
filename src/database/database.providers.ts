import { SEQUELIZE } from '../common/contants';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { Comment } from '../comment/entities/comment.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const config = configService.get('database');
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post, Comment]);
      return sequelize;
    },

    inject: [ConfigService],
  },
];
