import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

interface ExtendedRequest extends Request {
  user?: User;
}

export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request: ExtendedRequest = ctx.switchToHttp().getRequest();

    const user = request.user;

    if (data != null) {
      return user[data];
    }

    return user;
  }
);
