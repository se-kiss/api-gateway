import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateNotificationArgs,
  GetNotificationsArgs,
  NotificationId,
} from './notification.dto';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [Notification])
  async notification(
    @Args({ name: 'args', type: () => GetNotificationsArgs, nullable: true })
    args: GetNotificationsArgs,
  ): Promise<Notification[]> {
    return await this.notificationService.getNotifications(args);
  }

  @Mutation(() => Notification)
  async createNotification(
    @Args({ name: 'args', type: () => CreateNotificationArgs })
    args: CreateNotificationArgs,
  ): Promise<Notification> {
    return await this.notificationService.createNotification(args);
  }

  @Mutation(() => Notification)
  async deleteNotification(
    @Args({ name: 'args', type: () => NotificationId }) args: NotificationId,
  ): Promise<Notification> {
    return await this.notificationService.deleteNotification(args);
  }
}
