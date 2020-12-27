import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user';
import { Post } from 'src/post/post';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;
}
