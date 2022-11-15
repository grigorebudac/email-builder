import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface ExtendedRequest extends Request {
  user?: string;
}

export const GetUserId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: ExtendedRequest = ctx.switchToHttp().getRequest();

    const user = request.user;

    if (data != null) {
      return user[data];
    }

    return user;
  }
);
