import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationType, User } from '@prisma/client';
import { PubSub } from 'apollo-server-express';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { NotificationService } from 'src/notification/notification.service';
import { PostService } from 'src/post/post.service';
import { PUB_SUB } from 'src/shared/pubsub/pubsub.constants';
import { Comment } from 'src/shared/models/comment.model';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.dto';

@Resolver()
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @UseGuards(LogInOnly)
  @Mutation(() => Comment)
  async createComment(
    @Args('data') data: CreateCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    try {
      const { postId, mentionedUserId, text } = data;
      if (mentionedUserId === currentUser.id) {
        throw new Error('자기 자신은 태그할 수 없습니다.');
      }
      const newComment = await this.commentService.create(
        currentUser.id,
        postId,
        text,
        mentionedUserId,
      );
      const authorId = await this.postService.getAuthorId(postId);
      const recipientId = authorId;
      const existNotification = await this.notificationService.findExistOne(
        currentUser.id,
        recipientId,
        NotificationType.COMMENT_ON_MY_POST,
      );
      if (!existNotification && currentUser.id !== authorId) {
        // For author of post
        const newNotification = await this.notificationService.create(
          currentUser.id,
          recipientId,
          postId,
          NotificationType.COMMENT_ON_MY_POST,
        );
        this.pubSub.publish('newNotification', {
          recipientId,
          newNotification,
        });
      }
      if (mentionedUserId) {
        // For mentioned user of comment
        const newNotification = await this.notificationService.create(
          currentUser.id,
          mentionedUserId,
          postId,
          NotificationType.COMMENT_MENTIONED_ME,
        );
        this.pubSub.publish('newNotification', {
          mentionedUserId,
          newNotification,
        });
      }
      return newComment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
