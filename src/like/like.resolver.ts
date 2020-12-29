import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { User } from 'src/shared/models/user.model';
import { LikeOnPostService } from './likeOnPost.service';
import { LikeOnCommentService } from './likeOnComment.service';
import { ToggleLikeOnPostInput } from './dto/toggleLikeOnPost.dto';
import { ToggleLikeOnCommentInput } from './dto/toggleLikeOnComment.dto';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from '@prisma/client';
import { PostService } from 'src/post/post.service';
import { CommentService } from 'src/comment/comment.service';

@Resolver()
export class LikeResolver {
  constructor(
    private readonly likeOnPostService: LikeOnPostService,
    private readonly likeOnCommentService: LikeOnCommentService,
    private readonly notificationService: NotificationService,
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  @UseGuards(LogInOnly)
  @Mutation(() => String)
  async toggleLikeOnPost(
    @CurrentUser() currentUser: User,
    @Args('data') data: ToggleLikeOnPostInput,
  ) {
    try {
      let status: string;
      const { postId } = data;
      const existLike = await this.likeOnPostService.findOneByPostIdAndUserId(
        postId,
        currentUser.id,
      );
      if (existLike) {
        await this.likeOnPostService.delete(existLike.id);
        status = 'deleted';
      } else {
        await this.likeOnPostService.create(postId, currentUser.id);
        status = 'created';
      }
      const authorId = await this.postService.getAuthorId(postId);
      const existNotification = await this.notificationService.findExistOne(
        currentUser.id,
        authorId,
        NotificationType.LIKE_ON_MY_POST,
      );
      if (!existNotification && currentUser.id !== authorId) {
        const newNotification = await this.notificationService.create(
          currentUser.id,
          authorId,
          postId,
          NotificationType.LIKE_ON_MY_POST,
        );
        //publish notification
      }
      if (status === 'created') {
        return ' Like is created on the post';
      } else {
        return ' Like is deleted on the post';
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => String)
  async toggleLikeOnComment(
    @CurrentUser() currentUser: User,
    @Args('data') data: ToggleLikeOnCommentInput,
  ) {
    try {
      let status: string;
      const { postId, commentId } = data;
      const existLike = await this.likeOnCommentService.findOneByCommentIdAndUserId(
        postId,
        currentUser.id,
      );
      if (existLike) {
        await this.likeOnCommentService.delete(existLike.id);
        status = 'deleted';
      } else {
        await this.likeOnCommentService.create(
          postId,
          commentId,
          currentUser.id,
        );
        status = 'created';
      }
      const authorId = await this.commentService.getAuthorId(commentId);
      const existNotification = await this.notificationService.findExistOne(
        currentUser.id,
        authorId,
        NotificationType.LIKE_ON_MY_COMMENT,
      );
      if (!existNotification && currentUser.id !== authorId) {
        const newNotification = await this.notificationService.create(
          currentUser.id,
          authorId,
          postId,
          NotificationType.LIKE_ON_MY_COMMENT,
        );
        //publish notification
      }
      if (status === 'created') {
        return ' Like is created on the comment';
      } else {
        return ' Like is deleted on the comment';
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
