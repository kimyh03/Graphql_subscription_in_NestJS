import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeOnCommentService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findOneByCommentIdAndUserId(commentId: number, userId: number) {
    return await this.prismaService.likeOnComment.findFirst({
      where: {
        comment: { id: commentId },
        user: { id: userId },
      },
    });
  }

  async create(postId: number, commentId: number, userId: number) {
    return await this.prismaService.likeOnComment.create({
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
        comment: {
          connect: {
            id: commentId,
          },
        },
      },
    });
  }

  async delete(likeId) {
    await this.prismaService.likeOnComment.delete({
      where: { id: likeId },
    });
  }
}
