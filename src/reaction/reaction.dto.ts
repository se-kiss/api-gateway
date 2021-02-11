import { InputType, Field } from '@nestjs/graphql';
import { Reaction, ReactionType } from './reaction.model'

@InputType()
export class CreateReactionArgs {
  @Field(() => String)
  _id: string

  @Field(() => [String], { nullable: true })
  upVote?: string[]

  @Field(() => [String], { nullable: true })
  downVote?: string[]

  @Field(() => ReactionType)
  reactionType: ReactionType
}

@InputType()
export class ReactionId {
  @Field(() => String)
  _id: string
}

@InputType()
export class UpdateReactionArgs {
  @Field(() => String)
  _id: string

  @Field(() => [String], { nullable: true })
  upVote?: string[]

  @Field(() => [String], { nullable: true })
  downVote?: string[]
}

@InputType()
export class VoteArgs {
  @Field(() => String)
  userId: string

  @Field(() => String)
  targerId: string
}
