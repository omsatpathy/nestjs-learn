import { IsDate, IsEmail, IsISO8601, IsNotEmpty, Length, MaxLength, MinLength, } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(2, 50, { message: 'First name must be between 2 and 50 characters.' })
    name: string;

    phone_no: number;

    @Length(2, 100, { message: 'Occupation must be  between 2 and 100 characters.' })
    occupation: string;

    @Length(10, 100, { message: 'Address must be  between 10 and 100 characters.' })
    address: string;

    @Length(5, 100, { message: 'Password must be atleast 5 characters.' })
    password: string;
}