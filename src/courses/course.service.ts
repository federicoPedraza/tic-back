import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseException } from './course.exceptions';
import { Course } from 'src/entities/course.entity';
import { CourseDTO } from './course.dtos';

@Injectable()
export class CourseService {
  constructor(@Inject() private readonly repository: CourseRepository) {}

  async get(id: number): Promise<Course> {
    const course = await this.repository.get({ id });

    if (!course)
      throw new CourseException.CourseNotFound();

    return course;
  }

  async create(payload: CourseDTO.CreateCourse): Promise<Course> {
    const course = await this.repository.create(payload);

    return course;
  }

  async update(id: number, payload: CourseDTO.UpdateCourse): Promise<Course> {
    let changes = payload as Partial<Course>;

    // if we want to publish today and it's not published yet
    if (payload.isPublished && !payload.postedAt)
        changes.postedAt = new Date();
      else
        changes.postedAt = payload.postedAt || null;

    const course = await this.repository.update(id, payload);

    if (!course)
      throw new CourseException.CourseNotFound();

    return course;
  }
}
