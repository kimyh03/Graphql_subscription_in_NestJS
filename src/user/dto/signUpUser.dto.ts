import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';
import { User } from '../user';

@InputType()
export class SignUpUserInput extends PickType(User, ['name'], InputType) {}

@ObjectType()
export class SignUpUserOutput extends BaseOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
