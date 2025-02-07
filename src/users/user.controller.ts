import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTOs } from './user.dtos';

@Controller('users/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() payload: UserDTOs.SignupDTO): Promise<UserDTOs.SignupResponse> {
    const user = await this.userService.signup(payload);

    const token = await this.userService.login(user.email, user.password);

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
}
