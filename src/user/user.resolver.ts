import 'reflect-metadata';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SignUpUserInput } from './dto/signUpUser.dto';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { LogInOnly } from 'src/auth/logInOnly.guard';
import { User } from 'src/shared/models/user.model';
import { Auth } from 'src/shared/models/auth.model';
import { EditProfileInput } from './dto/editProfile.dto';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Auth)
  async signupUser(@Args('data') data: SignUpUserInput) {
    try {
      const { name, email } = data;
      const newUser = await this.userService.create(name, email);
      const token = this.authService.sign(newUser.id);
      return { user: newUser, token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Query(() => User)
  async getMe(@CurrentUser() currnetUser: User) {
    try {
      const user = await this.userService.findOneById(currnetUser.id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => String)
  async signOutUser(@CurrentUser() currentUser: User) {
    try {
      await this.userService.delete(currentUser.id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(LogInOnly)
  @Mutation(() => User)
  async editProfile(
    @CurrentUser() currentUser: User,
    @Args('data') data: EditProfileInput,
  ) {
    try {
      return await this.userService.update(currentUser.id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
