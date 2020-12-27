import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(userId: number, postId: number, text: string) {
    return await this.prismaService.comment.create({
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
        text,
      },
    });
  }
}
