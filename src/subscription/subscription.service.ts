import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SubscriptionGrpcService } from './subscription.grpc-service';
import {
  CreateSubscriptionArgs,
  GetSubscriptionsArgs,
  SubscriptionId,
  UnFollowArgs,
  UpdateSubscriptionArgs,
} from './subscription.dto';
import { Subscription } from './subscription.model';

@Injectable()
export class SubscriptionService {
  private subscriptionService: SubscriptionGrpcService;

  constructor(@Inject('SUBSCRIPTION_PACKAGE') private client: ClientGrpc) {
    this.subscriptionService = this.client.getService<SubscriptionGrpcService>(
      'SubscriptionService',
    );
  }

  async createSubscription(payload: CreateSubscriptionArgs): Promise<Subscription> {
    return await this.subscriptionService.createSubscription(payload).toPromise();
  }

  async getSubscriptions(payload: GetSubscriptionsArgs): Promise<Subscription[]> {
    const { subscriptions } = await this.subscriptionService
      .getSubscriptions(payload || {})
      .toPromise();
    return subscriptions || [];
  }

  async updateSubscription(payload: UpdateSubscriptionArgs): Promise<Subscription> {
    return await this.subscriptionService.updateSubscription(payload).toPromise();
  }

  async unFollow(args: UnFollowArgs): Promise<Subscription> {
    return await this.subscriptionService.unFollow(args).toPromise();
  }
}
