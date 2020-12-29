import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.model';
import { Comment } from './comment.model';
import { LikeOnComment } from './likeOnComment.model';
import { LikeOnPost } from './likeOnPost.model';
import { Notification } from './notification.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [LikeOnPost], { nullable: true })
  likesOnPost?: LikeOnPost[];

  @Field(() => [LikeOnComment], { nullable: true })
  likesOnComment?: LikeOnComment[];

  @Field(() => [Notification], { nullable: true })
  notificationsAsRecipient?: Notification[];

  @Field(() => [Notification], { nullable: true })
  notificationsAsSender?: Notification[];
}
