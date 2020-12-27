import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';

@InputType()
export class DeletePostInput {
  @Field()
  postId: number;
}

@ObjectType()
export class DeletePostOutput extends BaseOutput {}
