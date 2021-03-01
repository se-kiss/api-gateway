import { Observable } from 'rxjs';
import {
  CreateSubscriptionArgs,
  GetSubscriptionsArgs,
  SubscriptionId,
  Subscriptions,
  UpdateSubscriptionArgs,
} from './subscription.dto';
import { Subscription } from './subscription.model';

export interface SubscriptionGrpcService {
  createSubscription(payload: CreateSubscriptionArgs): Observable<Subscription>;
  getSubscriptions(payload: GetSubscriptionsArgs): Observable<Subscriptions>;
  updateSubscription(payload: UpdateSubscriptionArgs): Observable<Subscription>
  deleteSubscription(payload: SubscriptionId): Observable<Subscription>;
}