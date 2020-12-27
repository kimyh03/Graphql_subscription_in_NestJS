import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from './user';
import { PrismaService } from '../prisma.service';

@InputType()
class SignupUserInput {
  @Field({ nullable: true })
  name: string;
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Mutation(() => User)
  async signupUser(@Args('data') data: SignupUserInput): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: data.name,
      },
    });
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: number) {
    return this.prismaService.user.findUnique({
      where: { id: id },
    });
  }
}
