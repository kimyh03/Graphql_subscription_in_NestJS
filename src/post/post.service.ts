import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  async create(userId: number, text: string) {
    await this.prismaService.post.create({
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

  async findOneById(postId: number, relations?: string[]) {
    return await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: relations?.includes('user'),
        likes: relations?.includes('likes'),
        comments: relations?.includes('comments'),
      },
    });
  }

  async edit(postId: number, text: string) {
    await this.prismaService.post.update({
      where: { id: postId },
      data: { text },
    });
  }

  async delete(postId: number) {
    await this.prismaService.post.delete({
      where: { id: postId },
    });
  }
}
