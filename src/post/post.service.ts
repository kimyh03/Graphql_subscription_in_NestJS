import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  async create(userId: number, text: string) {
    return await this.prismaService.post.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        text,
      },
    });
  }

  async findOneById(postId: number) {
    return await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        likesOnPost: true,
        comments: { include: { likesOnComment: true, mentionedUser: true } },
      },
    });
  }

  async edit(postId: number, text: string) {
    return await this.prismaService.post.update({
      where: { id: postId },
      data: { text },
    });
  }

  async delete(postId: number) {
    await this.prismaService.post.update({
      where: { id: postId },
      data: { deletedAt: new Date() },
    });
  }
  async getAuthorId(postId: number) {
    return (await this.prismaService.post.findUnique({ where: { id: postId } }))
      .userId;
  }
}
