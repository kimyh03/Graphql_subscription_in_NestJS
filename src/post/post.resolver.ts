import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { User } from 'src/user/user';
import { PostService } from './post.service';
import { CreatePostOutput, CreatePostInput } from './dto/createPost.dto';
import { EditPostOutput, EditPostInput } from './dto/editPost.dto';
import { DeletePostOutput, DeletePostInput } from './dto/deletePost.dto';
import {
  GetPostDetailInput,
  GetPostDetailOutput,
} from './dto/getPostDetail.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(LogInOnly)
  @Mutation(() => CreatePostOutput)
  async createPost(
    @CurrentUser() currentUser: User,
    @Args('data') data: CreatePostInput,
  ): Promise<CreatePostOutput> {
    const { text } = data;
    try {
      await this.postService.create(currentUser.id, text);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => EditPostOutput)
  async editPost(
    @CurrentUser() currentUser: User,
    @Args('data') data: EditPostInput,
  ): Promise<EditPostOutput> {
    const { postId, text } = data;
    try {
      const post = await this.postService.findOneById(postId);
      if (!post) throw new NotFoundException();
      if (post.userId !== currentUser.id) throw new UnauthorizedException();
      await this.postService.edit(postId, text);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => DeletePostOutput)
  async deletePost(
    @CurrentUser() currentUser: User,
    @Args('data') data: DeletePostInput,
  ): Promise<DeletePostOutput> {
    const { postId } = data;
    try {
      const post = await this.postService.findOneById(postId);
      if (!post) throw new NotFoundException();
      if (post.userId !== currentUser.id) throw new UnauthorizedException();
      await this.postService.delete(postId);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  @Query(() => GetPostDetailOutput)
  async getPostDetail(
    @Args('data') data: GetPostDetailInput,
  ): Promise<GetPostDetailOutput> {
    const { postId } = data;
    try {
      const post = await this.postService.findOneById(postId, [
        'user',
        'likes',
        'comments',
      ]);
      if (!post) throw new NotFoundException();
      return { ok: true, error: null, post };
    } catch (error) {
      return { ok: false, error: error.message, post: null };
    }
  }
}
