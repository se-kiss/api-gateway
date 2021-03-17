import { 
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent, 
} from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import {
  CreateReactionArgs,
  GetReactionsArgs,
  ReactionId,
  VoteArgs,
} from './reaction.dto';
import { Reaction } from './reaction.model';
import { ReactionService } from './reaction.service';

@Resolver(() => Reaction)
export class ReactionResolver {
  constructor(
    private readonly reactionService: ReactionService,
    private readonly userService: UserService
    ) {}

  @Query(() => [Reaction])
  async reaction(
    @Args({ name: 'args', type: () => GetReactionsArgs, nullable: true })
    args: GetReactionsArgs,
  ): Promise<Reaction[]> {
    return await this.reactionService.getReactions(args);
  }

  @Mutation(() => Reaction)
  async createReaction(
    @Args({ name: 'args', type: () => CreateReactionArgs })
    args: CreateReactionArgs,
  ): Promise<Reaction> {
    return await this.reactionService.createReaction(args);
  }

  @Mutation(() => Reaction)
  async deleteReaction(
    @Args({ name: 'args', type: () => ReactionId }) args: ReactionId,
  ): Promise<Reaction> {
    return await this.reactionService.deleteReaction(args);
  }

  @Mutation(() => Reaction)
  async upVote(
    @Args({ name: 'args', type: () => VoteArgs }) args: VoteArgs,
  ): Promise<Reaction> {
    return await this.reactionService.upVote(args);
  }

  @Mutation(() => Reaction)
  async downVote(
    @Args({ name: 'args', type: () => VoteArgs }) args: VoteArgs,
  ): Promise<Reaction> {
    return await this.reactionService.upVote(args);
  }

  @ResolveField(() => User)
  async ownerUser(@Parent() { sourceId }: Reaction): Promise<User> {
    const res = await this.userService.getUsers({ ids: [sourceId]})
    return res[0]
  }
}
