import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
