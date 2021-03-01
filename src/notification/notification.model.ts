import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  COMMENT = 0,
  POST = 1,
}
registerEnumType(NotificationType, { name: 'NotificationType' });

@ObjectType()
export class Notification {
  @Field(() => String)
  _id: string;
  
  @Field(() => NotificationType, { nullable: true })
  NotificationType: string;

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;

  constructor(args: Notification) {
    Object.assign(this, args);
  }
}
