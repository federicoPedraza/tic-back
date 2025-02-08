import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AuthUser, User } from './entities';
import { OptionalJwtAuthGuard } from './config/jwt-optional.guard';
import { JwtAdminAuthGuard } from './config/jwt-admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseGuards(OptionalJwtAuthGuard)
  check(@Req() req: Request): string {
    const user = req.user as Partial<User> | null;

    return this.appService.check(user?.email);
  }

  @Get('/admin')
  @UseGuards(JwtAdminAuthGuard)
  admin(@Req() req: Request): string {
    const user = req.user as AuthUser;

    return this.appService.admin(user.email);
  }
}
