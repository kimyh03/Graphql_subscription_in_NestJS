import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';

@InputType()
export class ToggleLikeInput {
  @Field()
  postId: number;
}

@ObjectType()
export class ToggleLikeOutput extends BaseOutput {}
