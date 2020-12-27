import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findOneById(userId: number) {
    return await this.prismaService.user.findUnique({ where: { id: userId } });
  }

  async create(name: string) {
    return await this.prismaService.user.create({
      data: {
        name,
      },
    });
  }
}
