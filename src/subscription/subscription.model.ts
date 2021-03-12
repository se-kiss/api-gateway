import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Subscription {
  @Field(() => String)
  _id: string;

  @Field(() => [String])
  follower: string[];

  @Field(() => [String])
  following: string[];

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;

  constructor(args: Subscription) {
    Object.assign(this, args);
  }
}
