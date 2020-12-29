import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetPostDetailInput {
  @Field()
  postId: number;
}
