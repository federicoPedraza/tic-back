import { Response } from "src/common/response";
import { CoursePrice } from "src/entities/course-price.entity";
import { Course } from "src/entities/course.entity";

export namespace CourseDTO {
    // requests
    export class CreateCourse {
        name: string;
        isPublished: boolean = false;
        description: string = '';
        startsAt: Date | undefined;
        endsAt: Date | undefined;
        postedAt: Date | undefined;
    }

    export class UpdateCourse {
        name: string;
        isPublished: boolean = false;
        description: string = '';
        startsAt: Date | undefined;
        endsAt: Date | undefined;
        postedAt: Date | undefined;
    }

    export class UpdateCoursePrice {
        price: number = 0;
        currency: string;
        operation: 'add/update' | 'remove';
    }

    // responses
    export class GetCourse extends Response<Partial<Course>> {

    }
}
