import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, MinLength, MaxLength } from "class-validator";

export class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    passwordConfirm: string

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string
}

