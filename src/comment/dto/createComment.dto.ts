import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';

@InputType()
export class CreateCommentInput {
  @Field()
  postId: number;

  @Field()
  text: string;
}

@ObjectType()
export class CreateCommentOutput extends BaseOutput {}
