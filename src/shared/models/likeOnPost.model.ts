import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class LikeOnPost {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;
}
