import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { BlockService } from './modules/block/block.service';
import { BlockedUserInteractionGuard } from './common/guards/blocked-user-interaction.guard';
import { PostService } from './modules/post/services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  /// guard
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const postService = app.get(PostService);
  const blockService = app.get(BlockService);

  app.useGlobalGuards(
    new AuthGuard(reflector, jwtService),
    new BlockedUserInteractionGuard(reflector, postService, blockService)
  );
  await app.listen(3000);
}
bootstrap();
