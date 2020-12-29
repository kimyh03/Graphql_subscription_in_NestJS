import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Global()
@Module({
  providers: [UserService, UserResolver, PrismaService, AuthService],
  exports: [UserService],
})
export class UserModule {}
