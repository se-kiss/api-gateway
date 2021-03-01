import { Observable } from 'rxjs';
import {
  CreateNotificationArgs,
  GetNotificationsArgs,
  NotificationId,
  Notifications,
} from './notification.dto';
import { Notification } from './notification.model';

export interface NotificationGrpcService {
  createNotification(payload: CreateNotificationArgs): Observable<Notification>;
  getNotifications(payload: GetNotificationsArgs): Observable<{ notifications: Notification[] }>;
  deleteNotification(payload: NotificationId): Observable<Notification>;
}
