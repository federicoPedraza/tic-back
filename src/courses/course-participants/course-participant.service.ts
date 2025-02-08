import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../course.repository';
import { CourseParticipantRepository } from './course-participant.repository';
import { CourseException } from '../course.exceptions';
import { CourseParticipant } from 'src/entities/course-participant.entity';
import { Pagination } from 'src/common/pagination';

@Injectable()
export class CourseParticipantService {
  constructor(
        @Inject() private readonly courseRepository: CourseRepository,
        @Inject() private readonly courseParticipantRepository: CourseParticipantRepository
    ) {}

    async getParticipants(courseId: number): Promise<Pagination<CourseParticipant>> {
        const course = await this.courseRepository.get({ id: courseId });

        if (!course)
            throw new CourseException.CourseNotFound();

        return await this.courseParticipantRepository.getAll({ course });
    }
}
