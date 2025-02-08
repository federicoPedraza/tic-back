import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/user.repository';
import { AdminDTO } from './admin.dtos';
import { UserException } from 'src/users/user.exceptions';
import { User } from 'src/entities';
import { CourseParticipantRepository } from 'src/courses/course-participants/course-participant.repository';
import { CourseParticipant } from 'src/entities/course-participant.entity';

@Injectable()
export class AdminService {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    @Inject() private readonly courseParticipantRepository: CourseParticipantRepository,
    @Inject() private readonly configService: ConfigService
  ) {}

  async updateUser(userId: number, payload: AdminDTO.UpdateUser): Promise<User> {
    const result = await this.userRepository.update(userId, payload);

    if (!result)
      throw new UserException.UserNotFound();

    return result;
  }

  async deleteUser(id: number): Promise<AdminDTO.DeleteUserResponsePayload> {
    const user = await this.userRepository.get({ id });

    if (!user)
      throw new UserException.UserNotFound();

    const coursesCount = await this.courseParticipantRepository.removeMany({ email: user.email});

    await this.userRepository.remove(id);

    return {
      coursesCount
    }
  }
}
