import { Error } from "src/common/exceptions";

export namespace CoursePriceException {
    export class CoursePriceNotFound implements Error {
        constructor(
            public message: string = 'Course price not found',
            public code: number = 400
        ) {}
    }
}
