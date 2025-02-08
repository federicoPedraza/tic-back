import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'src/common/repository';
import { Course } from 'src/entities/course.entity';
import { FindOptionsWhere, Repository as TypeORMRepository } from 'typeorm';

@Injectable()
export class CourseRepository implements Repository<Course> {
  constructor(@InjectRepository(Course) private readonly repository: TypeORMRepository<Course>) {}

  async create(payload: Partial<Course>): Promise<Course> {
    const course = this.repository.create(payload);
    return this.repository.save(course);
  }

  async get(filter: Partial<Course>): Promise<Course | null> {
    return this.repository.findOne({ where: filter as FindOptionsWhere<Course> });
  }

  async update(id: number, payload: Partial<Course>): Promise<Course | null> {
    const target = await this.repository.preload({
      id,
      ...payload
    });

    if (!target)
      return null;

    return this.repository.save(target);
  }
}
