import { SEQUELIZE } from "../common/contants";
import { ConfigService } from "@nestjs/config";
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const config = configService.get('database');
      const sequelize = new Sequelize(config);
      sequelize.addModels([]);
      return sequelize;
    },
    
    inject: [ConfigService],
  },
];