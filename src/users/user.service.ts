import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities';
import { UserDTOs } from './user.dtos';
import { UserException } from './user.exceptions';

@Injectable()
export class UserService {
  constructor(@Inject() private readonly repository: UserRepository) {}

  async signup(payload: UserDTOs.SignupDTO): Promise<User> {
    return await this.repository.create(payload);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.repository.get({ email});

    if (!user)
      throw new UserException.InvalidCredentials();

    const matches = await user.validatePassword(password);

    if (!matches)
      throw new UserException.InvalidCredentials();

    return user.generateToken();
  }
}
