import { Error } from "src/common/exceptions";

export namespace UserException {
    export class UserNotFound implements Error {
        constructor(
            public message: string = 'User not found',
            public code: number = 400
        ) {}
    }

    export class InvalidCredentials implements Error {
        constructor(
            public message: string = 'Invalid credentials',
            public code: number = 401
        ) {}
    }

    export class UserAlreadyExists implements Error {
        constructor(
            public message: string = 'User already exists',
            public code: number = 409
        ) {}
    }
}
