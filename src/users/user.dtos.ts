import { Response } from "src/common/response";

export namespace UserDTOs {
    // requests
    export class SignupDTO {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }

    export class LoginDTO {
        email: string;
        password: string;
    }

    export class UpdateDTO {
        firstName: string | undefined;
        lastName: string | undefined;
    }

    // responses
    export class SignupResponse extends Response<SignupResponse> {
        token: string;
    }

    export class LoginResponse extends Response<LoginResponse> {
        token: string;
    }

    export class UpdateResponse extends Response<UpdateResponse> {

    }
}
