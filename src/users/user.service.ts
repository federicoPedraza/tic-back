import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthUser, User } from 'src/entities';
import { UserDTOs } from './user.dtos';
import { UserException } from './user.exceptions';
import { CommonException } from 'src/common/exceptions';

@Injectable()
export class UserService {
  constructor(@Inject() private readonly repository: UserRepository) {}

  async signup(payload: UserDTOs.SignupDTO): Promise<User> {
    try {
      const result = await this.repository.create(payload);
      return result;
    } catch (error) {
      const code = error.code;

      if (code === 'ER_DUP_ENTRY')
        throw new UserException.UserAlreadyExists();

      throw new CommonException.InternalServerError();
    }
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.repository.get({ email });

    if (!user)
      throw new UserException.InvalidCredentials();

    const matches = await user.validatePassword(password);

    if (!matches)
      throw new UserException.InvalidCredentials();

    return user.generateToken();
  }

  async update(data: AuthUser, payload: UserDTOs.UpdateDTO): Promise<User> {
    const result = await this.repository.update(data.id, payload);

    if (!result)
      throw new UserException.UserNotFound();

    return result;
  }

  async profile(data: AuthUser): Promise<Partial<User>> {
    const result = await this.repository.get({ id: data.id });

    if (!result)
      throw new UserException.UserNotFound();

    return {
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
    };
  }
}
