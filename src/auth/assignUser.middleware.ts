import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AssignUserMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers?.authorization?.split(' ')[1];
    if (token) {
      try {
        const payload = this.authService.verify(token);
        if (payload.hasOwnProperty('id')) {
          const user = await this.userService.findOneById(payload['id']);
          req.user = user;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    next();
  }
}
