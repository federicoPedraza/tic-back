import { Error } from "src/common/exceptions";

export namespace CourseException {
    export class CourseNotFound implements Error {
        constructor(
            public message: string = 'Course not found',
            public code: number = 400
        ) {}
    }

    export class ParticipantAlreadyExists implements Error {
        constructor(
            public message: string = 'Participant already exists',
            public code: number = 400
        ) {}
    }

    export class ParticipantNotFound implements Error {
        constructor(
            public message: string = 'Participant not found',
            public code: number = 400
        ) {}
    }
}
