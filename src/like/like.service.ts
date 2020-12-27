import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findOneByPostIdAndUserId(postId: number, userId: number) {
    return await this.prismaService.like.findFirst({
      where: {
        post: { id: postId },
        user: { id: userId },
      },
    });
  }

  async create(postId: number, userId: number) {
    return await this.prismaService.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }

  async delete(likeId) {
    await this.prismaService.like.delete({
      where: { id: likeId },
    });
  }
}
