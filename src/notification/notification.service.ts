import { Inject, Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(
    senderId: number,
    recipientId: number,
    postId: number,
    type: NotificationType,
  ) {
    return await this.prismaService.notification.create({
      data: {
        type,
        sender: {
          connect: { id: senderId },
        },
        recipient: {
          connect: { id: recipientId },
        },
        post: {
          connect: { id: postId },
        },
      },
    });
  }

  async setIsChekcedTrue(notificationId: number) {
    await this.prismaService.notification.update({
      where: { id: notificationId },
      data: {
        isChecked: true,
      },
    });
  }

  async findExistOne(
    senderId: number,
    recipientId: number,
    type: NotificationType,
  ) {
    return await this.prismaService.notification.findFirst({
      where: {
        senderId,
        recipientId,
        type,
      },
    });
  }

  async findExistAll(postId: number, recipientId: number) {
    return await this.prismaService.notification.findMany({
      where: {
        postId,
        recipientId,
      },
    });
  }
}
