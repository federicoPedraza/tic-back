import { Response } from "src/common/response";
import { User } from "src/entities";
import { IsOptional, IsString, IsInt, Min, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';


export namespace UserDTOs {
    // requests
    export class SignupDTO {
        @IsString()
        email: string;
        @IsString()
        password: string;
        @IsString()
        firstName: string;
        @IsString()
        lastName: string;
    }

    export class LoginDTO {
        @IsEmail()
        email: string;
        @IsString()
        password: string;
    }

    export class UpdateDTO {
        @IsOptional()
        @IsString()
        firstName: string | undefined;
        @IsOptional()
        @IsString()
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

    export class UserProfileResponse extends Response<Partial<User>> {

    }

    export class ExistsResponse extends Response<ExistsResponse> {
        exists: boolean;
    }
}
