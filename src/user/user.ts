import 'reflect-metadata';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from 'src/post/post';
import { Like } from 'src/like/like';
import { Comment } from 'src/comment/comment';
import { Notification } from 'src/notification/notification';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Like], { nullable: true })
  likes?: Like[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];
}
