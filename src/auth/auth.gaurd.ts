import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new ApolloError('Invalid Token', 'UNAUTHORIZED');
    }
    const token = auth.split(' ')[1];
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      const message = 'Token error: ' + (e.message || e.name);
      throw new ApolloError(message, 'UNAUTHORIZED');
    }
  }
}
