import { InputType, Field } from '@nestjs/graphql';
import { Notification, NotificationType } from './notification.model';

@InputType()
export class CreateNotificationArgs {
  @Field(() => NotificationType)
  NotificationType: NotificationType;
}

@InputType()
export class NotificationId {
  @Field(() => String)
  _id: string;
}

@InputType()
export class GetNotificationsArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}

@InputType()
export class Notifications {
  Notifications: Notification[]
}
