import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SubscriptionGrpcService } from './subscription.grpc-service';
import {
  CreateSubscriptionArgs,
  GetSubscriptionsArgs,
  SubscriptionId,
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
    const { Subscriptions } = await this.subscriptionService
      .getSubscriptions(payload || {})
      .toPromise();
    return Subscriptions || [];
  }

  async updateSubscription(payload: UpdateSubscriptionArgs): Promise<Subscription> {
    return await this.subscriptionService.updateSubscription(payload).toPromise();
  }

  async unFollow(id: SubscriptionId, targetId: String): Promise<Subscription> {
    return await this.subscriptionService.unFollow(id,targetId).toPromise();
  }
}
