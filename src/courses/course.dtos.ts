import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Pagination } from "src/common/pagination";
import { Response } from "src/common/response";
import { Course } from "src/entities/course.entity";

export namespace CourseDTO {
    // requests
    export class CreateCourse {
        @IsString()
        name: string;
        @IsBoolean()
        isPublished: boolean = false;
        @IsString()
        description: string = '';
        @IsOptional()
        @IsDate()
        startsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        endsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        postedAt: Date | undefined;
    }

    export class UpdateCourse {
        @IsString()
        name: string;
        @IsOptional()
        @IsString()
        isPublished: boolean = false;
        @IsOptional()
        @IsString()
        description: string = '';
        @IsOptional()
        @IsDate()
        startsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        endsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        postedAt: Date | undefined;
    }

    export class UpdateCoursePrice {
        @IsNumber()
        @Min(0)
        @IsOptional()
        price: number = 0;
        @IsString()
        currency: string;
        operation: 'add/update' | 'remove';
    }

    export class GetCoursesQuery {
        name?: string;
        page?: number;
        limit?: number;
    }

    // responses
    export class GetCourse extends Response<Partial<Course>> {

    }

    export class GetCourses extends Response<Pagination<Partial<Course>>> {

    }
}
