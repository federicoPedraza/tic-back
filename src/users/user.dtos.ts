import { Response } from "src/common/response";
import { User } from "src/entities";
import { IsOptional, IsString, IsInt, Min, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";


export namespace UserDTOs {
    // requests
    export class SignupDTO {
        @ApiProperty({
            description: 'Email of the user',
            required: true,
            type: String,
            example: 'test@gmail.com'
        })
        @IsString()
        email: string;
        @ApiProperty({
            description: 'Password of the user',
            required: true,
            type: String,
            example: 'password'
        })
        @IsString()
        password: string;
        @ApiProperty({
            description: 'First name of the user',
            required: true,
            type: String,
            example: 'John'
        })
        @IsString()
        firstName: string;
        @ApiProperty({
            description: 'Last name of the user',
            required: true,
            type: String,
            example: 'Doe'
        })
        @IsString()
        lastName: string;
    }

    export class LoginDTO {
        @ApiProperty({
            description: 'Email of the user',
            required: true,
            type: String,
            example: 'test@gmail.com'
        })
        @IsEmail()
        email: string;
        @ApiProperty({
            description: 'Password of the user',
            required: true,
            type: String,
            example: 'password'
        })
        @IsString()
        password: string;
    }

    export class UpdateDTO {
        @ApiProperty({
            description: 'First name of the user',
            required: false,
            type: String,
            example: 'John'
        })
        @IsOptional()
        @IsString()
        firstName: string | undefined;
        @ApiProperty({
            description: 'Last name of the user',
            required: false,
            type: String,
            example: 'Doe'
        })
        @IsOptional()
        @IsString()
        lastName: string | undefined;
        @ApiProperty({
            description: 'Phone number of the user',
            required: false,
            type: String,
            example: '1234567890'
        })
        @IsOptional()
        @IsString()
        phone: string | undefined;
    }

    // responses
    export class SignupResponse extends Response<SignupResponse> {
        @ApiProperty({
            description: 'Token for the user',
        })
        token: string;
    }

    export class LoginResponse extends Response<LoginResponse> {
        @ApiProperty({
            description: 'Token for the user',
        })
        token: string;
    }

    export class UpdateResponse extends Response<UpdateResponse> {

    }

    export class UserProfileResponse extends Response<Partial<User>> {

    }

    export class ExistsResponse extends Response<ExistsResponse> {
        @ApiProperty({
            description: 'Boolean value if the user exists',
        })
        exists: boolean;
    }
}
