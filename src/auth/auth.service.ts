import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  sign(userId: number): string {
    const token = jwt.sign(
      { id: userId },
      this.configService.get('JWT_SECRET'),
    );
    return token;
  }

  verify(token: string) {
    const payLoad = jwt.verify(token, this.configService.get('JWT_SECRET'));
    return payLoad;
  }
}
