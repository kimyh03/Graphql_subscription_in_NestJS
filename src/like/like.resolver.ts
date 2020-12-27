import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { User } from 'src/user/user';
import { LikeService } from './like.service';
import { ToggleLikeInput, ToggleLikeOutput } from './dto/toggleLike.dto';

@Resolver()
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(LogInOnly)
  @Mutation(() => ToggleLikeOutput)
  async toggleLike(
    @CurrentUser() currentUser: User,
    @Args('data') data: ToggleLikeInput,
  ): Promise<ToggleLikeOutput> {
    try {
      const { postId } = data;
      const existLike = await this.likeService.findOneByPostIdAndUserId(
        postId,
        currentUser.id,
      );
      if (existLike) {
        await this.likeService.delete(existLike.id);
      } else {
        await this.likeService.create(postId, currentUser.id);
      }
      return { ok: true, error: null };
    } catch (error) {
      return { ok: true, error: null };
    }
  }
}
