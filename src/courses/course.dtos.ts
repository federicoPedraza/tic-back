import { Response } from "src/common/response";
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
        postedAt: Date | undefined
    }

    // responses
    export class GetCourse extends Response<Partial<Course>> {

    }
}
