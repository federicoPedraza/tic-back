import { IsOptional, IsString } from 'class-validator';
import { Response } from 'src/common/response';


export namespace AdminDTO {
    // requests
    export class UpdateUser {
        @IsOptional()
        @IsString()
        firstName: string | undefined;
        @IsOptional()
        @IsString()
        lastName: string | undefined;
        @IsOptional()
        @IsString()
        phone: string | undefined;
    }

    // responses
    export class DeleteUserResponse extends Response<DeleteUserResponsePayload> {

    }

    export class DeleteUserResponsePayload {
        coursesCount: number = 0;
    }
}
