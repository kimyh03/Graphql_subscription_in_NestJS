import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NotificationService, NotificationResolver, PrismaService],
})
export class NotificationModule {}
