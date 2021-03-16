import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.model';
import {
  GetSubscriptionsArgs,
  CreateSubscriptionArgs,
  UpdateSubscriptionArgs,
  SubscriptionId,
  UnFollowArgs,
} from './subscription.dto';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Query(() => [Subscription])
  async subscriptions(
    @Args({ name: 'args', type: () => GetSubscriptionsArgs, nullable: true })
    args: GetSubscriptionsArgs,
  ): Promise<Subscription[]> {
    return await this.subscriptionService.getSubscriptions(args);
  }

  @Mutation(() => Subscription)
  async createSubscription(
    @Args({ name: 'args', type: () => CreateSubscriptionArgs })
    args: CreateSubscriptionArgs,
  ): Promise<Subscription> {
    return await this.subscriptionService.createSubscription(args);
  }

  @Mutation(() => Subscription)
  async updateSubscription(
    @Args({ name: 'args', type: () => UpdateSubscriptionArgs })
    args: UpdateSubscriptionArgs,
  ): Promise<Subscription> {
    return await this.subscriptionService.updateSubscription(args);
  }

  @Mutation(() => Subscription)
  async unFollow(
    @Args({ name: 'args', type: () => UnFollowArgs })
    args: UnFollowArgs,
  ): Promise<Subscription> {
    return await this.subscriptionService.unFollow(args);
  }
}
