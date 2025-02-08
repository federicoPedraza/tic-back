import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePriceRepository } from './course-price.repository';
import { CoursePrice } from 'src/entities/course-price.entity';
import { CoursePriceService } from './course-price.service';
import { CourseRepository } from '../course.repository';
import { Course } from 'src/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePrice, Course])],
  providers: [CoursePriceRepository, CourseRepository, CoursePriceService],
})
export class CoursePriceModule {}
