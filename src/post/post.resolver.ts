import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/createPost.dto';
import { EditPostInput } from './dto/editPost.dto';
import { DeletePostInput } from './dto/deletePost.dto';
import { GetPostDetailInput } from './dto/getPostDetail.dto';
import { User } from 'src/shared/models/user.model';
import { Post } from 'src/shared/models/post.model';
import { NotificationService } from 'src/notification/notification.service';
import { CacheService } from 'src/shared/cache/cache.service';

@Resolver()
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService,
  ) {}

  @Query(() => String)
  async getRedis(@Args('key') key: string) {
    try {
      const res = await this.cacheService.get(key);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => Boolean)
  async setRedis(@Args('key') key: string, @Args('value') value: string) {
    try {
      await this.cacheService.set(key, value);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() currentUser: User,
    @Args('data') data: CreatePostInput,
  ) {
    const { text } = data;
    try {
      return await this.postService.create(currentUser.id, text);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => Post)
  async editPost(
    @CurrentUser() currentUser: User,
    @Args('data') data: EditPostInput,
  ) {
    const { postId, text } = data;
    try {
      const post = await this.postService.findOneById(postId);
      if (!post) throw new NotFoundException();
      if (post.userId !== currentUser.id) throw new UnauthorizedException();
      return await this.postService.edit(postId, text);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => String)
  async deletePost(
    @CurrentUser() currentUser: User,
    @Args('data') data: DeletePostInput,
  ) {
    const { postId } = data;
    try {
      const post = await this.postService.findOneById(postId);
      if (!post) throw new NotFoundException();
      if (post.userId !== currentUser.id) throw new UnauthorizedException();
      await this.postService.delete(postId);
      return 'The post was deleted!';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Query(() => Post)
  async getPostDetail(
    @Args('data') data: GetPostDetailInput,
    @CurrentUser() currenUser: User,
  ) {
    const { postId } = data;
    try {
      const post = await this.postService.findOneById(postId);
      if (!post) throw new NotFoundException();
      if (post.deletedAt !== null) throw new Error('삭제된 게시물 입니다.');
      const existNotifications = await this.notificationService.findExistAll(
        postId,
        currenUser.id,
      );
      if (existNotifications) {
        existNotifications.forEach((notification) => {
          this.notificationService.setIsChekcedTrue(notification.id);
        });
      }
      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
