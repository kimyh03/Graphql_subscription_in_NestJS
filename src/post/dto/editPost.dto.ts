import { Field, InputType, PickType } from '@nestjs/graphql';
import { Post } from 'src/shared/models/post.model';

@InputType()
export class EditPostInput extends PickType(Post, ['text'], InputType) {
  @Field()
  postId: number;
}
