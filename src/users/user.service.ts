import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities';
import { UserDTOs } from './user.dtos';

@Injectable()
export class UserService {
  constructor(@Inject() private readonly repository: UserRepository) {}

  async signup(payload: UserDTOs.SignupDTO): Promise<User> {
    return await this.repository.create(payload);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.repository.get({ email});

    if (!user) {
      console.log('User not found');
      return 'error';
    }

    const matches = await user.validatePassword(password);

    if (matches)
      return 'token';

    return 'error';
  }
}
