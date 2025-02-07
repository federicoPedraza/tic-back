import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTOs } from './user.dtos';
import { JwtAuthGuard } from 'src/config/jwt.guard';
import { Request } from 'express';
import { AuthUser } from 'src/entities';

@Controller('users/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() payload: UserDTOs.SignupDTO): Promise<UserDTOs.SignupResponse> {
    const user = await this.userService.signup(payload);

    const token = user.generateToken();

    return {
      message: "User created",
      code: 201,
      token
    }
  }

  @Get('login')
  async login(@Body() payload: UserDTOs.LoginDTO): Promise<UserDTOs.LoginResponse> {
    const token = await this.userService.login(payload.email, payload.password);

    return {
      message: "User logged in",
      code: 200,
      token
    }
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req: Request, @Body() payload: UserDTOs.UpdateDTO): Promise<UserDTOs.UpdateResponse> {
    const auth = req.user as AuthUser;

    await this.userService.update(auth, payload);

    return {
      message: "User updated",
      code: 200,
    }
  }
}
