import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Inject } from '@nestjs/common';
import { EditProfileInput } from './dto/editProfile.dto';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findOneById(userId: number) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        posts: true,
        notificationsAsRecipient: { include: { sender: true } },
      },
    });
  }

  async create(name: string, email: string) {
    return await this.prismaService.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async delete(userId: number) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
        posts: {
          updateMany: {
            where: { userId },
            data: { deletedAt: new Date() },
          },
        },
        comments: {
          updateMany: {
            where: { userId },
            data: { deletedAt: new Date() },
          },
        },
      },
    });
  }

  async update(userId: number, data: EditProfileInput) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
}
