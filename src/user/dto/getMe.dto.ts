import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';
import { User } from '../user';

@ObjectType()
export class GetMeOutput extends BaseOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
