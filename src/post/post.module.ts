import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [
    PostService,
    PostResolver,
    PrismaService,
    NotificationService,
    UserService,
  ],
})
export class PostModule {}
