import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Identity, Token, Me } from './auth.model';
import { AuthService } from './auth.service';
import { CreateIdentityArgs, LoginArgs } from './auth.dto';
import { AuthGuard } from './auth.gaurd';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Me)
  @UseGuards(new AuthGuard())
  async me(@Context('user') user: string): Promise<any> {
    return user;
  }

  @Mutation(() => Identity)
  async register(
    @Args({ name: 'args', type: () => CreateIdentityArgs })
    args: CreateIdentityArgs,
  ): Promise<Identity> {
    return await this.authService.register(args);
  }

  @Query(() => Token)
  async login(
    @Args({ name: 'args', type: () => LoginArgs }) args: LoginArgs,
  ): Promise<Token> {
    return await this.authService.login(args);
  }
}
