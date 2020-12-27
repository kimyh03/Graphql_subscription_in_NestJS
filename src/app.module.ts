import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { NotificationModule } from './notification/notification.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
