import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Auth {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
