import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { RedisCacheModule } from 'src/shared/cache/cache.module';
import { CacheService } from 'src/shared/cache/cache.service';

@Module({
  imports: [RedisCacheModule],
  providers: [
    PostService,
    PostResolver,
    PrismaService,
    NotificationService,
    UserService,
    CacheService,
  ],
})
export class PostModule {}
