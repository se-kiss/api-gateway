import { ClientGrpc } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { NotificationGrpcService } from './notification.grpc-service';
import {
  CreateNotificationArgs,
  GetNotificationsArgs,
  NotificationId,
} from './notification.dto';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
  private notificationService: NotificationGrpcService;

  constructor(@Inject('NOTIFICATION_PACKAGE') private client: ClientGrpc) {
    this.notificationService = this.client.getService<NotificationGrpcService>(
      'NotificationService',
    );
  }

  async createNotification(payload: CreateNotificationArgs): Promise<Notification> {
    return await this.notificationService.createNotification(payload).toPromise();
  }

  async getNotifications(payload: GetNotificationsArgs): Promise<Notification[]> {
    const { notifications } = await this.notificationService
      .getNotifications(payload || {})
      .toPromise();
    return notifications || [];                                                                                                                                                                                                                                                                                                      
  }

  async deleteNotification(payload: NotificationId): Promise<Notification> {
    return await this.notificationService.deleteNotification(payload).toPromise();
  }
}
