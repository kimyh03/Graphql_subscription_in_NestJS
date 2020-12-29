import { Module } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { NotificationService } from 'src/notification/notification.service';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma.service';
import { LikeResolver } from './like.resolver';
import { LikeOnCommentService } from './likeOnComment.service';
import { LikeOnPostService } from './likeOnPost.service';

@Module({
  providers: [
    LikeOnCommentService,
    LikeOnPostService,
    LikeResolver,
    PrismaService,
    NotificationService,
    PostService,
    CommentService,
  ],
})
export class LikeModule {}
