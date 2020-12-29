import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';
import { Post } from './post.model';
import { User } from './user.model';

registerEnumType(NotificationType, { name: 'NotificationType' });

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  recipient: User;

  @Field(() => User)
  sender: User;

  @Field(() => Post)
  post: Post;

  @Field({ defaultValue: false })
  isChecked: boolean;

  @Field(() => NotificationType)
  type: NotificationType;
}
