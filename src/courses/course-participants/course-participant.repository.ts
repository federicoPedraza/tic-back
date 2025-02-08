import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base.repository';
import { CourseParticipant } from 'src/entities/course-participant.entity';
import { Repository as TypeORMRepository } from 'typeorm';

@Injectable()
export class CourseParticipantRepository extends BaseRepository<CourseParticipant> {
  constructor(
    @InjectRepository(CourseParticipant)
    repository: TypeORMRepository<CourseParticipant>,
  ) {
    super(repository);
  }
}
