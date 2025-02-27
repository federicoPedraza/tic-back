import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base.repository';
import { Course } from 'src/entities/course.entity';
import { Repository as TypeORMRepository } from 'typeorm';

@Injectable()
export class CourseRepository extends BaseRepository<Course> {
  constructor(
    @InjectRepository(Course)
    repository: TypeORMRepository<Course>,
  ) {
    super(repository);
  }
}
