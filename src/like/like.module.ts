import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';

@Module({
  providers: [LikeService, LikeResolver],
})
export class LikeModule {}
