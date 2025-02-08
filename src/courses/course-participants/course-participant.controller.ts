import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseParticipantService } from './course-participant.service';
import { CourseParticipantDTO } from './course-participant.dtos';

@Controller('participants')
@ApiTags('course-participants')
export class CourseParticipantController {
  constructor(
    @Inject() private readonly courseParticipantService: CourseParticipantService,
  ) {}

  @ApiOperation({ summary: 'Get all course participants' })
  @Get("/list/:id")
  async list(@Param('id') courseId: number): Promise<CourseParticipantDTO.GetParticipantsResponse>{
    const participants = await this.courseParticipantService.getParticipants(courseId);

    return {
        message: "Course participants fetched",
        code: 200,
        data: participants
    }
  }
}
