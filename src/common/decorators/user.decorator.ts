import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) =>
  ctx.switchToHttp().getRequest().user
);
