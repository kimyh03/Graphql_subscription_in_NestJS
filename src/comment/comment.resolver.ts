import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { User } from 'src/user/user';
import { CommentService } from './comment.service';
import {
  CreateCommentOutput,
  CreateCommentInput,
} from './dto/createComment.dto';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(LogInOnly)
  @Mutation(() => CreateCommentOutput)
  async createComment(
    @Args('data') data: CreateCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    try {
      const { postId, text } = data;
      await this.commentService.create(currentUser.id, postId, text);
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
}
