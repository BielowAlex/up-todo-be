import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../modules/auth/auth.types';

export const ExtractUserId = createParamDecorator(
  (data: keyof JwtPayload = 'id', context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request.user;
    return request.user.id;
  },
);
