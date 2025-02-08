import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      const request = context.switchToHttp().getRequest();
      this.logger.warn(
        `Unauthorized request from ${request.ip} for ${request.method} ${request.url}`,
      );
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
