import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeOnPostService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findOneByPostIdAndUserId(postId: number, userId: number) {
    return await this.prismaService.likeOnPost.findFirst({
      where: {
        post: { id: postId },
        user: { id: userId },
      },
    });
  }

  async create(postId: number, userId: number) {
    return await this.prismaService.likeOnPost.create({
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
    await this.prismaService.likeOnPost.delete({
      where: { id: likeId },
    });
  }
}
