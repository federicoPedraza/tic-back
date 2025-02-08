import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserRepository } from 'src/users/user.repository';
import { CourseParticipantRepository } from 'src/courses/course-participants/course-participant.repository';
import { CourseParticipant } from 'src/entities/course-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CourseParticipant])],
  controllers: [AdminController],
  providers: [AdminService, UserRepository, CourseParticipantRepository],
})
export class AdminModule {}
