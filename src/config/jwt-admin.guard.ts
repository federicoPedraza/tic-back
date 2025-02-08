import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommonException } from 'src/common/exceptions';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAdminAuthGuard.name);

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      const request = context.switchToHttp().getRequest();
      this.logger.warn(
        `Unauthorized request from ${request.ip} for ${request.method} ${request.url}`,
      );
      this.logger.warn(
        `User data: ${JSON.stringify(user)}, info: ${JSON.stringify(info)}`,
      )
      throw err || new CommonException.UnreachableResource();
    }

    if (user.role !== 'admin') {
      const request = context.switchToHttp().getRequest();
      this.logger.warn(
        `Access denied: User ${user.email} with role '${user.role}' attempted to access ${request.method} ${request.url}`,
      );
      throw new CommonException.UnreachableResource();
    }

    return user;
  }
}
