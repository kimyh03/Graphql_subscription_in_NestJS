import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from 'src/prisma.service';
import { PostService } from 'src/post/post.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [
    PostService,
    CommentService,
    CommentResolver,
    PrismaService,
    NotificationService,
  ],
})
export class CommentModule {}
