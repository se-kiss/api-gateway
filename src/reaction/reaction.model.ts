import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum ReactionType {
  COMMENT = 0,
  POST = 1
}
registerEnumType(ReactionType, { name: 'ReactionType' });

@ObjectType()
export class Reaction {
  @Field(() => String)
  _id: string;

  @Field(() => [String])
  upVote: string[];

  @Field(() => [String])
  downVote: string[];

  @Field(() => ReactionType, { nullable: true })
  reactionType: string;

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;

  constructor(args: Reaction) {
    Object.assign(this, args);
  }
}