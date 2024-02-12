import { IsDate, IsEmail, IsNotEmpty, Length, } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(5, null, { message: 'Password must be atleast 5 characters.' })
    password: string;

    @Length(2, 50, { message: 'First name must be between 2 and 50 characters.' })
    first_name: string;

    @Length(2, 100, { message: 'Last name must be between 2 and 100 characters.' })
    last_name: string;

    @IsDate()
    dob: Date;
}