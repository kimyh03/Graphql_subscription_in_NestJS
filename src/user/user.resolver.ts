import 'reflect-metadata';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './user';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SignUpUserInput, SignUpUserOutput } from './dto/signUpUser.dto';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GetMeOutput } from './dto/getMe.dto';
import { UseGuards } from '@nestjs/common';
import { LogInOnly } from 'src/auth/logInOnly.guard';

@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => SignUpUserOutput)
  async signupUser(
    @Args('data') data: SignUpUserInput,
  ): Promise<SignUpUserOutput> {
    try {
      const { name } = data;
      const newUser = await this.userService.create(name);
      const token = this.authService.sign(newUser.id);
      return { ok: true, error: null, token };
    } catch (error) {
      return { ok: false, error: error.message, token: null };
    }
  }

  @UseGuards(LogInOnly)
  @Query(() => GetMeOutput)
  async getMe(@CurrentUser() currnetUser: User): Promise<GetMeOutput> {
    try {
      const user = await this.userService.findOneById(currnetUser.id, [
        'posts',
      ]);
      return { ok: true, error: null, user };
    } catch (error) {
      return { ok: false, error: error.message, user: null };
    }
  }
}
