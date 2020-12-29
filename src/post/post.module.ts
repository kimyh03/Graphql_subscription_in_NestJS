import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [PostService, PostResolver, PrismaService, NotificationService],
})
export class PostModule {}
