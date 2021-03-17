import {
  Resolver,
  Query,
  Mutation,
  Context,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Identity, Token, Me } from './auth.model';
import { AuthService } from './auth.service';
import { CreateIdentityArgs, LoginArgs } from './auth.dto';
import { AuthGuard } from './auth.gaurd';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Resolver(() => Me)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Mutation(() => Token)
  async login(
    @Args({ name: 'args', type: () => LoginArgs }) args: LoginArgs,
  ): Promise<Token> {
    return await this.authService.login(args);
  }

  @ResolveField(() => User)
  async user(@Parent() { userId }: Me): Promise<User> {
    const res = await this.userService.getUsers({ ids: [userId] });
    return res[0];
  }
}
