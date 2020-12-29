import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Global()
@Module({
  providers: [PrismaService, UserService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
