import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';
import { Post } from '../post';

@InputType()
export class EditPostInput extends PickType(Post, ['text'], InputType) {
  @Field()
  postId: number;
}

@ObjectType()
export class EditPostOutput extends BaseOutput {}
