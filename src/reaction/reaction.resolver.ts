import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateReactionArgs, ReactionId, UpdateReactionArgs, VoteArgs } from './reaction.dto';
import { Reaction } from './reaction.model';
import { ReactionService } from './reaction.service';

@Resolver()
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Query(() => [Reaction])
  async reaction(
    @Args({ name: 'args', type: () => ReactionId, nullable: true })
    args: ReactionId,
  ): Promise<Reaction[]> {
    return await this.reactionService.getReaction(args);
  }

  @Mutation(() => Reaction)
  async createReaction(
    @Args({ name: 'args', type: () => CreateReactionArgs }) args: CreateReactionArgs,
  ): Promise<Reaction> {
    return await this.reactionService.createReaction(args);
  }

  @Mutation(() => Reaction)
  async updateReaction(
    @Args({ name: 'args', type: () => UpdateReactionArgs }) args: UpdateReactionArgs,
  ): Promise<Reaction> {
    return await this.reactionService.updateReaction(args);
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
