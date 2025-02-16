import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseException } from './course.exceptions';
import { Course } from 'src/entities/course.entity';
import { CourseDTO } from './course.dtos';
import { Pagination } from 'src/common/pagination';

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

  async list(filter: Partial<Course>, pagination?: Pagination<Partial<CourseDTO.ExtraCourseDetails>>): Promise<Pagination<Partial<CourseDTO.ExtraCourseDetails>>> {
    const courses = await this.repository.getAll<Partial<CourseDTO.ExtraCourseDetails>>(filter, pagination);

    courses.items = courses.items.map(course => {
      return {
        ...course,
        live: course && course.isOngoing ? course.isOngoing() : false
      }
    });


    return courses;
  }

  async startCourse(id: number): Promise<Date> {
    const course = await this.repository.get({ id });

    if (!course)
      throw new CourseException.CourseNotFound();

    if (course.hasStarted())
      throw new CourseException.CourseAlreadyStarted();

    await this.repository.update(id, { startsAt: new Date() });
    return new Date();
  }

  async endCourse(id: number): Promise<Date> {
    const course = await this.repository.get({ id });

    if (!course)
      throw new CourseException.CourseNotFound();

    if (!course.hasStarted())
      throw new CourseException.CourseHasNotStarted();

    await this.repository.update(id, { endsAt: new Date() });
    return new Date();
  }
}
