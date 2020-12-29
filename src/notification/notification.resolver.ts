import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { Notification } from 'src/shared/models/notification.model';
import { User } from 'src/shared/models/user.model';
import { NotificationService } from './notification.service';

const pubSub = new PubSub();

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Subscription(() => Notification)
  async newNotification() {
    return pubSub.asyncIterator('newNotification');
  }

  @Mutation(() => Boolean)
  async potatoReady() {
    pubSub.publish('potatoReady', { waitPotato: 'Yout potato is ready' });
    return true;
  }

  @UseGuards(LogInOnly)
  @Subscription(() => String)
  async waitPotato(@CurrentUser() currentUser: User) {
    console.log(currentUser);
    return pubSub.asyncIterator('potatoReady');
  }
}
