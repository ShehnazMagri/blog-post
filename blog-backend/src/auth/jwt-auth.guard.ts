/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decoded = jwt.verify(token, '5e9d6b2c1b1a730ce7a4cd40fa7e7c9dbf81f86ee9535bb6b4c3a4d3a727faeacf2d30e7f69b0a3a7d8dbb528c2adf4f7179b8caa0c6aa1cc66a7bb55a6f4c2a',);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.user = decoded;
      return true;
  
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
