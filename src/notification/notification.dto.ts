import { InputType, Field } from '@nestjs/graphql';
import { Notification, NotificationType } from './notification.model';

@InputType()
export class CreateNotificationArgs {
  @Field(() => String)
  ownerId: string

  @Field(() => [String])
  followingUser: string[]

  @Field(() => NotificationType)
  notificationType: NotificationType;
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
  notifications: Notification[]
}
