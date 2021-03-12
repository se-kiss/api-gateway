import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import {
  GetUsersArgs,
  CreateUserArgs,
  UpdateUserArgs,
  DeleteUserArgs,
} from './user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async user(
    @Args({ name: 'args', type: () => GetUsersArgs, nullable: true })
    args: GetUsersArgs,
  ): Promise<User[]> {
    return await this.userService.getUsers(args);
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'args', type: () => CreateUserArgs }) args: CreateUserArgs,
  ): Promise<User> {
    return await this.userService.createUser(args);
  }

  @Mutation(() => User)
  async updateUser(
    @Args({ name: 'args', type: () => UpdateUserArgs }) args: UpdateUserArgs,
  ): Promise<User> {
    return await this.userService.updateUser(args);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args({ name: 'args', type: () => DeleteUserArgs }) args: DeleteUserArgs,
  ): Promise<User> {
    return await this.userService.deleteUser(args);
  }
}
