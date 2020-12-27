import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [LikeService, LikeResolver, PrismaService],
})
export class LikeModule {}
