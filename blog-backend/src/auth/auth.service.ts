import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly staticUser = {
    email: 'admin@example.com',
    password: '123456',  // static password
  };

  validateUser(email: string, password: string) {
    if (
      email === this.staticUser.email &&
      password === this.staticUser.password
    ) {
      const token = jwt.sign(
        { email: this.staticUser.email },
        '5e9d6b2c1b1a730ce7a4cd40fa7e7c9dbf81f86ee9535bb6b4c3a4d3a727faeacf2d30e7f69b0a3a7d8dbb528c2adf4f7179b8caa0c6aa1cc66a7bb55a6f4c2a',
        { expiresIn: '1h' }
      );

      return {
        message: 'Login successful',
        token,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
