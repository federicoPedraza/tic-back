import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/user.repository';
import { AdminDTO } from './admin.dtos';
import { UserException } from 'src/users/user.exceptions';
import { User } from 'src/entities';

@Injectable()
export class AdminService {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    @Inject() private readonly configService: ConfigService
  ) {}

  async updateUser(userId: number, payload: AdminDTO.UpdateUser): Promise<User> {
    const result = await this.userRepository.update(userId, payload);

    if (!result)
      throw new UserException.UserNotFound();

    return result;
  }
}
