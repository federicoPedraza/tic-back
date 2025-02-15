import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../course.repository';
import { CourseParticipantRepository } from './course-participant.repository';
import { CourseException } from '../course.exceptions';
import { CourseParticipant } from 'src/entities/course-participant.entity';
import { Pagination } from 'src/common/pagination';
import { CourseParticipantDTO } from './course-participant.dtos';
import { AuthUser } from 'src/entities';
import { CommonException } from 'src/common/exceptions';
import { UserRepository } from 'src/users/user.repository';
import { UserException } from 'src/users/user.exceptions';

@Injectable()
export class CourseParticipantService {
  constructor(
        @Inject() private readonly courseRepository: CourseRepository,
        @Inject() private readonly courseParticipantRepository: CourseParticipantRepository,
        @Inject() private readonly userRepository: UserRepository
    ) {}

    async getParticipants(requester: AuthUser, courseId: number): Promise<Pagination<CourseParticipant>> {
        if (requester.role !== 'admin')
            throw new CommonException.UnreachableResource();

        const course = await this.courseRepository.get({ id: courseId });

        if (!course)
            throw new CourseException.CourseNotFound();

        return await this.courseParticipantRepository.getAll({ course });
    }

    async requestAccess(courseId: number, email: string, phone?: string): Promise<CourseParticipantDTO.RequestJoinResponsePayload> {
        const course = await this.courseRepository.get({ id: courseId });

        if (!course)
            throw new CourseException.CourseNotFound();

        const participant = await this.courseParticipantRepository.get({ courseId, email });

        if (participant)
            throw new CourseException.ParticipantAlreadyExists();

        await this.courseParticipantRepository.create({ course, email, phone });

        const user = await this.userRepository.get({ email });
        if (user && phone && user.phone !== phone)
            await this.userRepository.update(user.id, { phone });

        return {
            email,
            courseName: course.name,
            phone
        }
    }

    async giveAccess(requester: AuthUser, courseId: number, payload: CourseParticipantDTO.GiveAccessRequest): Promise<CourseParticipantDTO.GiveAccessResponsePayload> {
        if (requester.role !== 'admin')
            throw new CommonException.UnreachableResource();

        if (payload.email === undefined && payload.userId === undefined)
            throw new CommonException.BadRequest();

        const course = await this.courseRepository.get({ id: courseId });
        if (!course)
            throw new CourseException.CourseNotFound();

        const query = payload.userId ? { id: payload.userId } : { email: payload.email };
        const user = await this.userRepository.get(query);
        if (!user)
            throw new UserException.UserNotFound();

        const participant = await this.courseParticipantRepository.get({ courseId, email: user.email });
        if (participant)
            if (!participant.isConfirmed) {
                await this.courseParticipantRepository.update(participant.id, { isConfirmed: true });
            } else {
                throw new CourseException.ParticipantAlreadyExists();
            }
        else {
            await this.courseParticipantRepository.create({ course, email: user.email, phone: payload.phone });
        }


        return {
            phoneNumberMatches: user.phone === payload.phone,
            userId: user.id,
            userName: user.firstName
        }
    }
}
