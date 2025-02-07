export abstract class Error {
    message: string;
    code: number;

    constructor(message: string, code: number) {
        this.message = message;
        this.code = code;
    }
}


export namespace CommonException {
    export class InternalServerError extends Error {
        constructor() {
            super("Internal Server Error", 500);
        }
    }

    export class UnreachableResource extends Error {
        constructor() {
            super("Unreachable Resource", 503);
        }
    }
}
