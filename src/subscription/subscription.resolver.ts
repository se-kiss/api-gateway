import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription.model';
import {
  GetSubscriptionsArgs,
  CreateSubscriptionArgs,
  UpdateSubscriptionArgs,
  UnFollowArgs,
} from './subscription.dto';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService
    ) {}

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

  @ResolveField(() => User)
  async ownerUser(@Parent() { userId }: Subscription): Promise<User> {
    const res = await this.userService.getUsers({ ids: [userId]})
    return res[0]
  }

  @ResolveField(() => [User])
  async FollowingUser(@Parent() { following }: Subscription): Promise<User[]> {
    const res = await this.userService.getUsers({ ids: following})
    return res
  }

  @ResolveField(() => [User])
  async FollowerUser(@Parent() { follower }: Subscription): Promise<User[]> {
    const res = await this.userService.getUsers({ ids: follower})
    return res
  }
}
