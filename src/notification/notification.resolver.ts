import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Notification } from 'src/shared/models/notification.model';
import { NotificationService } from './notification.service';

const pubSub = new PubSub();

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Subscription(() => Notification)
  async subNotification() {
    return pubSub.asyncIterator('newNotification');
  }
}
