import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAdminAuthGuard } from 'src/config/jwt-admin.guard';
import { AdminDTO } from './admin.dtos';
import { Response } from 'src/common/response';
import { User } from 'src/entities';

@Controller('admin/')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly configService: ConfigService) {}

  @ApiOperation({ summary: "Update someone else's profile" })
  @Put('user/:id')
  @UseGuards(JwtAdminAuthGuard)
  async update(@Body() payload: AdminDTO.UpdateUser, @Param('id') userId: string): Promise<Response<Partial<User>>> {
    const changes = await this.adminService.updateUser(parseInt(userId), payload);

    return {
      message: "User updated",
      code: 200,
      data: changes
    }
  }
}
