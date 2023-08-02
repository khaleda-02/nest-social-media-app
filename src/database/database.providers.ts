import { SEQUELIZE } from '../common/contants';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const config = configService.get('database');
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post]);
      return sequelize;
    },

    inject: [ConfigService],
  },
];
