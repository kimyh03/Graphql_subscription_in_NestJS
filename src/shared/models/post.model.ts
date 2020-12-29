import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { User } from './user.model';
import { LikeOnComment } from './likeOnComment.model';
import { LikeOnPost } from './likeOnPost.model';
import { Notification } from './notification.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;

  @Field(() => User)
  user: User;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [LikeOnPost], { nullable: true })
  likesOnPost?: LikeOnPost[];

  @Field(() => [LikeOnComment], { nullable: true })
  likesOnComment?: LikeOnComment[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];
}
