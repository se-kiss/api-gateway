import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import {
  GetUsersArgs,
  CreateUserArgs,
  UpdateUserArgs,
  DeleteUserArgs,
} from './user.dto';
import { PlaylistService } from '../playlist/playlist.service';
import { Playlist } from '../playlist/playlist.model';
import { CommentService } from '../comment/comment.service';
import { Comment } from 'src/comment/comment.model';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly playlistService: PlaylistService,
    private readonly commentService: CommentService,
  ) {}

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

  @ResolveField(() => [Playlist])
  async playlists(@Parent() { _id }: User): Promise<Playlist[]> {
    return await this.playlistService.getPlaylists({
      filters: { ownerId: _id },
    });
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() { _id }: User): Promise<Comment[]> {
    return await this.commentService.getComments({ filters: { userId: _id } });
  }
}
