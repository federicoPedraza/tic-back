import { Inject, Injectable } from '@nestjs/common';
import { CoursePriceRepository } from './course-price.repository';
import { CoursePrice } from 'src/entities/course-price.entity';
import { CourseRepository } from '../course.repository';
import { CourseException } from '../course.exceptions';
import { CoursePriceException } from './course-price.exceptions';
import { CommonException } from 'src/common/exceptions';

@Injectable()
export class CoursePriceService {
  constructor(
        @Inject() private readonly coursePriceRepository: CoursePriceRepository,
        @Inject() private readonly courseRepository: CourseRepository,
    ) {}

  async get(id: number): Promise<CoursePrice> {
    const course = await this.courseRepository.get({ id });

    if (!course)
      throw new CourseException.CourseNotFound();

    const coursePrice = await this.coursePriceRepository.get({ course });

    if (!coursePrice)
      throw new CoursePriceException.CoursePriceNotFound();

    return coursePrice
  }

  async addOrUpdate(courseId: number, payload: Partial<CoursePrice>): Promise<CoursePrice> {
    const course = await this.courseRepository.get({ id: courseId });

    if (!course)
      throw new CourseException.CourseNotFound();

    const coursePrice = await this.coursePriceRepository.get({ currency: payload.currency });

    let result: CoursePrice | null = null;

    if (coursePrice)
        result = await this.coursePriceRepository.update(coursePrice.id, payload);
    else
        result = await this.coursePriceRepository.create({ ...payload, course });

    if (!result)
        throw new CommonException.InternalServerError();

    return result;
  }

  async remove(currency: string): Promise<boolean> {
    const coursePrice = await this.coursePriceRepository.get({ currency });

    if (!coursePrice)
      throw new CoursePriceException.CoursePriceNotFound();

    return await this.coursePriceRepository.remove(coursePrice.id);
  }
}
