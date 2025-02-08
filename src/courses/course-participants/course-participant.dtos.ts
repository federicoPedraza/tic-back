import { Pagination } from "src/common/pagination";
import { Response } from "src/common/response";
import { CourseParticipant } from "src/entities/course-participant.entity";

export namespace CourseParticipantDTO {
    // requests


    // responses
    export class GetParticipantsResponse extends Response<Pagination<Partial<CourseParticipant>>> {

    }
}
