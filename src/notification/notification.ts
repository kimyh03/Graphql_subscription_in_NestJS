import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Post } from 'src/post/post';
import { User } from 'src/user/user';
import { NotificationType } from './dto/NotificationTypeEnum';

registerEnumType(NotificationType, { name: 'NotificationTypea' });

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;

  @Field({ defaultValue: false })
  isChecked: boolean;

  @Field(() => NotificationType)
  type: NotificationType;
}
