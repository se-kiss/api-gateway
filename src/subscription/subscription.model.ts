import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Subscription {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  userId: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  follower: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  following: string[];

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;

  constructor(args: Subscription) {
    Object.assign(this, args);
  }
}
