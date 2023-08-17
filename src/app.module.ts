import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { AuthModule } from './modules/auth/auth.module';
import { BlockedUserInteractionGuard } from './common/guards/blocked-user-interaction.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ReplyModule } from './modules/reply/reply.module';
import { BlockModule } from './modules/block/block.module';
import { AppGateway } from './app.gateway';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: config }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    ReplyModule,
    BlockModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
