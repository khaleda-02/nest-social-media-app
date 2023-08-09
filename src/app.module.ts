import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: config }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    ReplyModule,
  ],
  providers: [AppGateway],
  
})
export class AppModule {}
