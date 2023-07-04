import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { ReqUser } from 'src/auth/types/req-user.type';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): ReqUser => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.user as ReqUser;
  },
);
