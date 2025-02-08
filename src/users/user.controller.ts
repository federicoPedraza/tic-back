import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTOs } from './user.dtos';
import { JwtAuthGuard } from 'src/config/jwt.guard';
import { Request } from 'express';
import { AuthUser } from 'src/entities';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users/')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

  @ApiOperation({ summary: 'Check if user exists' })
  @Post('exists')
  async exists(@Body() payload: { email: string }): Promise<UserDTOs.ExistsResponse> {
    const exists = await this.userService.exists(payload.email);
    const message = exists ? "User exists" : "User does not exist";

    return {
      message,
      code: 200,
      exists
    }
  }

  @ApiOperation({ summary: 'Create a new user. Also signs in and returns token' })
  @Post('sign-up')
  async signUp(@Body() payload: UserDTOs.SignupDTO): Promise<UserDTOs.SignupResponse> {
    const user = await this.userService.signup(payload);

    const token = user.generateToken(this.configService);

    return {
      message: "User created",
      code: 201,
      token
    }
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(@Body() payload: UserDTOs.LoginDTO): Promise<UserDTOs.LoginResponse> {
    const token = await this.userService.login(payload.email, payload.password);

    return {
      message: "User logged in",
      code: 200,
      token
    }
  }

  @ApiOperation({ summary: 'Update user' })
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

  @ApiOperation({ summary: 'Get user profile' })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request, @Param('id') param: string): Promise<UserDTOs.UserProfileResponse> {
    const auth = req.user as AuthUser;
    const id = parseInt(param);

    const profile = await this.userService.profile(auth, id);

    return {
      message: "User profile",
      code: 200,
      data: profile
    }
  }
}
