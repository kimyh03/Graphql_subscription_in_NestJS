import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { PUB_SUB } from 'src/shared/common.constants';
import { Notification } from 'src/shared/models/notification.model';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @UseGuards(LogInOnly)
  @Subscription(() => Notification, {
    filter: ({ recipientId }, _, context) => {
      return recipientId === context.user.id;
    },
    resolve: ({ newNotification }) => newNotification,
  })
  async newNotification() {
    return this.pubSub.asyncIterator('newNotification');
  }
}
