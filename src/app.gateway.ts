import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PostService } from './modules/post/services';

@WebSocketGateway()
export class AppGateway implements OnModuleInit {
  private logger = new Logger(AppGateway.name);
  constructor(private postService: PostService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`Client connected with ${socket.id} id `);
    });
  }

  @SubscribeMessage('postViewed')
  async handlePostViewed(@MessageBody() body) {
    const post = await this.postService.incrementNumOfWatchers(body.postId);
    if (!post) this.logger.debug(`post not found`);
  }
}
