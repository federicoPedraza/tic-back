import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseParticipantService } from './course-participant.service';
import { CourseParticipantDTO } from './course-participant.dtos';
import { AuthUser } from 'src/entities';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/config/jwt.guard';

@Controller('participants')
@ApiTags('course-participants')
export class CourseParticipantController {
  constructor(
    @Inject() private readonly courseParticipantService: CourseParticipantService,
  ) {}

  @ApiOperation({ summary: 'Get all course participants' })
  @Get("/list/:id")
  @UseGuards(JwtAuthGuard)
  async list(@Param('id') courseId: number, @Req() req: Request): Promise<CourseParticipantDTO.GetParticipantsResponse>{
    const user = req.user as AuthUser;
    const participants = await this.courseParticipantService.getParticipants(user, courseId);

    return {
        message: "Course participants fetched",
        code: 200,
        data: participants
    }
  }

  @ApiOperation({ summary: 'Requests to join a course' })
  @Post("/join/:id")
  @UseGuards(JwtAuthGuard)
  async requestAccess(@Param('id') courseId: number, @Body() payload: CourseParticipantDTO.RequestJoinRequest, @Req() req: Request): Promise<CourseParticipantDTO.RequestJoinResponse>{
    const user = req.user as AuthUser;
    const data = await this.courseParticipantService.requestAccess(courseId, user.email, payload.phone);

    return {
        message: "Request sent",
        code: 200,
        data
    }
  }

  @ApiOperation({ summary: 'Requests to join a course' })
  @Post("/grant/:id")
  @UseGuards(JwtAuthGuard)
  async giveAccess(@Param('id') courseId: number, @Body() payload: CourseParticipantDTO.GiveAccessRequest, @Req() req: Request): Promise<CourseParticipantDTO.GiveAccessResponse>{
    const requester = req.user as AuthUser;
    const data = await this.courseParticipantService.giveAccess(requester, courseId, payload);

    return {
        message: "Access granted",
        code: 200,
        data
    }
  }
}
