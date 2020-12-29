import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class LogInOnly implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext?.create(context)?.getContext();
    const token = gqlContext.token;
    const payload = this.authService.verify(token);
    if (payload.hasOwnProperty('id')) {
      const user = await this.userService.findOneById(payload['id']);
      gqlContext['user'] = user;
      if (!user) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
