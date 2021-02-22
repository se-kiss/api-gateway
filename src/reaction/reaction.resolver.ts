import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateReactionArgs,
  GetReactionsArgs,
  ReactionId,
  VoteArgs,
} from './reaction.dto';
import { Reaction } from './reaction.model';
import { ReactionService } from './reaction.service';

@Resolver()
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Query(() => [Reaction])
  async reaction(
    @Args({ name: 'args', type: () => ReactionId, nullable: true })
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
}
