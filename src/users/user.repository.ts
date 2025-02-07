import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'src/common/repository';
import { User } from 'src/entities';
import { FindOptionsWhere, Repository as TypeORMRepository } from 'typeorm';

@Injectable()
export class UserRepository implements Repository<User> {
  constructor(@InjectRepository(User) private readonly repository: TypeORMRepository<User>) {}

  async create(payload: Partial<User>): Promise<User> {
    const user = this.repository.create(payload);
    return this.repository.save(user);
  }

  async get(filter: Partial<User>): Promise<User | null> {
    return this.repository.findOne({ where: filter as FindOptionsWhere<User> });
  }
}
