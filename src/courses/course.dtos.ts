import { Type } from "class-transformer";
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
        @Type(() => Date)
        startsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        @Type(() => Date)
        endsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        @Type(() => Date)
        postedAt: Date | undefined;
    }

    export class UpdateCourse {
        @IsString()
        name: string;
        @IsOptional()
        @IsBoolean()
        isPublished: boolean = false;
        @IsOptional()
        @IsString()
        description: string = '';
        @IsOptional()
        @IsDate()
        @Type(() => Date)
        startsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        @Type(() => Date)
        endsAt: Date | undefined;
        @IsOptional()
        @IsDate()
        @Type(() => Date)
        postedAt: Date | undefined;
    }

    export class UpdateCoursePrice {
        @IsNumber()
        @Min(0)
        @IsOptional()
        price: number = 0;
        @IsString()
        currency: string;
        @IsString()
        operation: 'add/update' | 'remove';
    }

    export class UpdateCourseStatus {
        @IsString()
        operation: 'start' | 'end';
    }

    export class GetCoursesQuery {
        name?: string;
        page?: number;
        limit?: number;
    }

    // responses
    export class GetCourse extends Response<Partial<Course>> {

    }

    export class GetCourses extends Response<Pagination<Partial<ExtraCourseDetails>>> {

    }

    export class ExtraCourseDetails extends Course {
        live: boolean;
    }

    export class UpdateCourseStatusResponse extends Response<string> {

    }
}
