import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { CoursePriceService } from './course-prices/course-price.service';
import { CoursePriceRepository } from './course-prices/course-price.repository';
import { CoursePrice } from 'src/entities/course-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CoursePrice])],
  controllers: [CourseController],
  providers: [CourseService, CoursePriceService, CoursePriceRepository, CourseRepository],
})
export class CourseModule {}
