import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class LikeOnComment {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;

  @Field(() => Comment)
  comment: Comment;
}
