import { InputType, Field } from '@nestjs/graphql';
import { Reaction, ReactionType } from './reaction.model';

@InputType()
export class CreateReactionArgs {
  @Field(() => String)
  sourceId: string

  @Field(() => [String], { nullable: true })
  upVote?: string[];

  @Field(() => [String], { nullable: true })
  downVote?: string[];

  @Field(() => ReactionType)
  reactionType: ReactionType;
}

@InputType()
export class ReactionId {
  @Field(() => String)
  _id: string;
}

@InputType()
export class GetReactionsArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}

@InputType()
export class VoteArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  targetId: string;
}

@InputType()
export class Reactions {
  reactions: Reaction[]
}
