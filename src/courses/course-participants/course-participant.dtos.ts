import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Pagination } from "src/common/pagination";
import { Response } from "src/common/response";
import { CourseParticipant } from "src/entities/course-participant.entity";

export namespace CourseParticipantDTO {
    // requests
    export class RequestJoinRequest {
        @IsOptional()
        @IsString()
        phone?: string;
    }

    export class GiveAccessRequest {
        @IsNumber()
        @IsOptional()
        userId?: number;

        @IsString()
        @IsOptional()
        email?: string;

        @IsOptional()
        @IsString()
        phone?: string;

        @IsBoolean()
        @IsOptional()
        isPaid: boolean = false;

        @IsBoolean()
        @IsOptional()
        isConfirmed: boolean = false;
    }

    // responses
    export class GetParticipantsResponse extends Response<Pagination<Partial<CourseParticipant>>> {

    }

    export class RequestJoinResponse extends Response<RequestJoinResponsePayload> {

    }

    export class RequestJoinResponsePayload {
        courseName: string;
        email: string;
        phone?: string;
    }

    export class GiveAccessResponse extends Response<GiveAccessResponsePayload> {

    }

    export class GiveAccessResponsePayload {
        phoneNumberMatches: boolean;
        userId: number;
        userName: string;
    }

}
