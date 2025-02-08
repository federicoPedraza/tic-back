import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './course.dtos';
import { JwtAuthGuard } from 'src/config/jwt.guard';
import { CoursePriceService } from './course-prices/course-price.service';
import { Pagination } from 'src/common/pagination';
import { Course } from 'src/entities/course.entity';
import { OptionalJwtAuthGuard } from 'src/config/jwt-optional.guard';
import { Request } from 'express';
import { AuthUser } from 'src/entities';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly coursePriceService: CoursePriceService
    ) { }

    @ApiOperation({ summary: 'Get course details' })
    @Get("details/:id")
    async getCourse(id: number): Promise<CourseDTO.GetCourse> {
        const course = await this.courseService.get(id);

        return {
            message: "Course retrieved successfully",
            code: 200,
            data: course
        }
    }

    @ApiOperation({ summary: 'Get list of courses' })
    @Get('list')
    @UseGuards(OptionalJwtAuthGuard)
    async getCourses(@Query() query: CourseDTO.GetCoursesQuery, @Req() request: Request): Promise<CourseDTO.GetCourses> {
        const user = request.user as AuthUser | null;
        const filter: Partial<Course> = {};

        if (query.name) {
            filter.name = query.name;
        }

        if (!user || user.role !== 'admin') {
            filter.isPublished = true;
        }

        const pagination = new Pagination<Partial<Course>>([], query.page, query.limit, 0);
        const courses = await this.courseService.list(filter, pagination);

        return {
            message: "Courses retrieved successfully",
            code: 200,
            data: courses
        }
    }

    @ApiOperation({ summary: 'Create a new course' })
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createCourse(@Body() payload: CourseDTO.CreateCourse): Promise<CourseDTO.GetCourse> {
        const course = await this.courseService.create(payload);

        return {
            message: "Course created successfully",
            code: 201,
            data: course
        }
    }

    @ApiOperation({ summary: 'Update course' })
    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    async updateCourse(@Param('id') param: string, @Body() payload: CourseDTO.UpdateCourse): Promise<CourseDTO.GetCourse> {
        const id = parseInt(param);

        const course = await this.courseService.update(id, payload);

        return {
            message: "Course updated successfully",
            code: 200,
            data: course
        }
    }

    @ApiOperation({ summary: 'Updates a price given a course id' })
    @Put('update/:courseId/prices')
    @UseGuards(JwtAuthGuard)
    async updatePrice(@Param('courseId') courseId: string, @Body() payload: CourseDTO.UpdateCoursePrice): Promise<CourseDTO.GetCourse> {
        let message: string = "Operation not made"

        switch(payload.operation) {
            case 'add/update':
                await this.coursePriceService.addOrUpdate(parseInt(courseId), payload);
                message = "Course price updated successfully";
                break;
            case 'remove':
                await this.coursePriceService.remove(payload.currency);
                message = "Course price removed successfully"
                break;
        }

        return {
            message,
            code: 200,
        }
    }
}
