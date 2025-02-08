import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base.repository';
import { User } from 'src/entities';
import { CoursePrice } from 'src/entities/course-price.entity';
import { Repository as TypeORMRepository } from 'typeorm';

@Injectable()
export class CoursePriceRepository extends BaseRepository<CoursePrice> {
  constructor(
    @InjectRepository(CoursePrice)
    repository: TypeORMRepository<CoursePrice>,
  ) {
    super(repository);
  }
}
