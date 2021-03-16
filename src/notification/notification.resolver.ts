import { 
  Resolver, 
  Query, 
  Mutation, 
  Args,
  ResolveField,
  Parent,
 } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { User } from '../user/user.model';
import {
  CreateNotificationArgs,
  GetNotificationsArgs,
  NotificationId,
} from './notification.dto';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
    ) {}

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

  @ResolveField(() => User)
  async ownerUser(@Parent() { ownerId }: Notification): Promise<User> {
    const res = await this.userService.getUsers({ ids: [ownerId]})
    return res[0]
  }

  @ResolveField(() => [User])
  async FollowingUser(@Parent() { followingUser }: Notification): Promise<User[]> {
    const res = await this.userService.getUsers({ ids: followingUser})
    return res
  }
}
