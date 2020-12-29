import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ToggleLikeOnCommentInput {
  @Field()
  postId: number;

  @Field()
  commentId: number;
}
