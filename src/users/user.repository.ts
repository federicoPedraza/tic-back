import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base.repository';
import { User } from 'src/entities';
import { Repository as TypeORMRepository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    repository: TypeORMRepository<User>,
  ) {
    super(repository);
  }
}
