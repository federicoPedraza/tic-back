import { IsOptional, IsString } from 'class-validator';


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
}
