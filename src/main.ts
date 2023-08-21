import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { BlockService } from './modules/block/block.service';
import { BlockedUserInteractionGuard } from './common/guards/blocked-user-interaction.guard';
import { PostService } from './modules/post/services';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CommonService } from './common.service';

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
  const commonService = app.get(CommonService);

  app.useGlobalGuards(
    new AuthGuard(reflector, jwtService),
    new BlockedUserInteractionGuard(
      reflector,
      commonService.getPostService(),
      commonService.getBlockService()
    )
  );

  // standardrize 
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
