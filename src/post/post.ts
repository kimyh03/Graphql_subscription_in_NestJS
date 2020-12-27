import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/comment';
import { Like } from 'src/like/like';
import { User } from 'src/user/user';
import { Notification } from 'src/notification/notification';

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

  @Field(() => [Like], { nullable: true })
  likes?: Like[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];
}
