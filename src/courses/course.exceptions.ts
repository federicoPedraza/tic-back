import { Error } from "src/common/exceptions";

export namespace CourseException {
    export class CourseNotFound implements Error {
        constructor(
            public message: string = 'Course not found',
            public code: number = 401
        ) {}
    }
}
