import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { User } from './entities';
import { OptionalJwtAuthGuard } from './config/jwt-optional.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  check(@Req() req: Request): string {
    const user = req.user as Partial<User> | null;

    return this.appService.check(user?.email);
  }
}
