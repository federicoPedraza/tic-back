import { UserDTOs } from "./user.dtos";

export namespace UserSwagger {
    export const ExistsResponse: UserDTOs.ExistsResponse = {
        message: "User does not exist",
        code: 404,
        exists: false
    }

    export const SignUpResponse: UserDTOs.SignupResponse = {
        message: "User created",
        code: 201,
        token: "token12341234"
    }

    export const LoginResponse: UserDTOs.LoginResponse = {
        message: "User logged in",
        code: 200,
        token: "token12341234"
    }

    export const UpdateResponse: UserDTOs.UpdateResponse = {
        message: "User updated",
        code: 200
    }

    export const ProfileResponse: UserDTOs.UserProfileResponse = {
        message: "User profile",
        code: 200,
        data: {
            email: "test@gmail.com",
            firstName: "John",
            lastName: "Doe",
            phone: "1234567890",
        }
    }
}
