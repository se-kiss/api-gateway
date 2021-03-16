import { InputType, Field } from '@nestjs/graphql';
import { Subscription } from './subscription.model';

@InputType()
export class CreateSubscriptionArgs {
  @Field(() => String)
  userId: string;

  @Field(() => [String], { nullable: true , defaultValue: [] })
  follower?: string[];

  @Field(() => [String], { nullable: true , defaultValue: [] })
  following?: string[];
}

@InputType()
export class SubscriptionId {
  @Field(() => String)
  _id: string;
}

@InputType()
export class UnFollowArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  targetId: string;
}

@InputType()
export class GetSubscriptionsArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}

@InputType()
export class UpdateSubscriptionArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  follower?: string;

  @Field(() => String, { nullable: true })
  following?: string;
}

@InputType()
export class Subscriptions {
  subscriptions: Subscription[]
}
