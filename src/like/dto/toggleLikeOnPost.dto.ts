import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ToggleLikeOnPostInput {
  @Field()
  postId: number;
}
