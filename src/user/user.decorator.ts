import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SECRET } from '../config';
import * as jwt from 'jsonwebtoken';

export const UserDecorator = createParamDecorator(
  (data: { field: any; roles: string[] }, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization
      ? (req.headers.authorization as string).split(' ')
      : null;
    if (token && token[1]) {
      const decoded: any = jwt.verify(token[1], SECRET);
      if (data.roles.includes(decoded.user.role)) {
        return !!data.field ? decoded[data.field] : decoded.user;
      }
    }

    throw new UnauthorizedException('Insufficient permissions');
  },
);
