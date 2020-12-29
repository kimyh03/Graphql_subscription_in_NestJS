import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LikeOnComment } from './likeOnComment.model';
import { Post } from './post.model';
import { User } from './user.model';

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

  @Field(() => [LikeOnComment], { nullable: true })
  likesOnComment?: LikeOnComment[];
}
