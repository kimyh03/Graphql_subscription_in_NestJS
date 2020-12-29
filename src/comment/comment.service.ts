import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getAuthorId(commentId: number) {
    return (
      await this.prismaService.post.findUnique({ where: { id: commentId } })
    ).userId;
  }

  async create(
    userId: number,
    postId: number,
    text: string,
    mentionUserId?: number,
  ) {
    const baseQuery = {
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
    };
    if (mentionUserId) {
      return await this.prismaService.comment.create({
        data: {
          ...baseQuery,
          mentionedUser: {
            connect: {
              id: mentionUserId,
            },
          },
        },
      });
    } else {
      return await this.prismaService.comment.create({
        data: {
          ...baseQuery,
        },
      });
    }
  }
}
