import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../course.repository';
import { Course } from 'src/entities/course.entity';
import { CourseParticipant } from 'src/entities/course-participant.entity';
import { CourseParticipantService } from './course-participant.service';
import { CourseParticipantController } from './course-participant.controller';
import { CourseParticipantRepository } from './course-participant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CourseParticipant, Course])],
  controllers: [CourseParticipantController],
  providers: [CourseRepository, CourseParticipantRepository, CourseParticipantService],
})
export class CourseParticipantModule {}
