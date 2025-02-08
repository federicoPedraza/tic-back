import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './course.dtos';
import { JwtAuthGuard } from 'src/config/jwt.guard';

@Controller('courses/')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get(":id")
    async getCourse(id: number): Promise<CourseDTO.GetCourse> {
        const course = await this.courseService.get(id);

        return {
            message: "Course retrieved successfully",
            code: 200,
            data: course
        }
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createCourse(@Body() payload: CourseDTO.CreateCourse): Promise<CourseDTO.GetCourse> {
        console.log(payload);
        const course = await this.courseService.create(payload);

        return {
            message: "Course created successfully",
            code: 201,
            data: course
        }
    }

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
}
