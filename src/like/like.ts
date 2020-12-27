import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post';
import { User } from 'src/user/user';

@ObjectType()
export class Like {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;
}
