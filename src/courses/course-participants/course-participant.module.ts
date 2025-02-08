import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from '../course.repository';
import { Course } from 'src/entities/course.entity';
import { CourseParticipant } from 'src/entities/course-participant.entity';
import { CourseParticipantService } from './course-participant.service';
import { CourseParticipantController } from './course-participant.controller';
import { CourseParticipantRepository } from './course-participant.repository';
import { UserRepository } from 'src/users/user.repository';
import { User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourseParticipant, Course, User])],
  controllers: [CourseParticipantController],
  providers: [CourseRepository, CourseParticipantRepository, UserRepository, CourseParticipantService],
})
export class CourseParticipantModule {}
