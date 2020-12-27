import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';
import { Post } from '../post';

@InputType()
export class GetPostDetailInput {
  @Field()
  postId: number;
}

@ObjectType()
export class GetPostDetailOutput extends BaseOutput {
  @Field(() => Post, { nullable: true })
  post?: Post;
}
