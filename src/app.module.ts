import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: config }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
