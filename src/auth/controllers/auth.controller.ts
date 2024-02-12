import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthUserDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
import { sendResponse } from "src/utils/sendResponse";


@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {};

    @Post()
    async authUser(@Body() authUserDto: AuthUserDto, @Res() res: Response) {
        const token = await this.authService.authUser(authUserDto);
        sendResponse(res, { message: 'Token sent.', token }, 200);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string },  @Res() res: Response) {
        const otp = await this.authService.forgotPassword(body.email);
        sendResponse(res, { message: 'OTP sent.', otp }, 200);
    }

    @Post('reset-password') 
    async resetPassword(@Body() body: { email: string, otp: number, newPassword: string },  @Res() res: Response) {
        const data = await this.authService.resetPassword(body.email, body.otp, body.newPassword);
        sendResponse(res, { message: 'Password succesfully reset.', data}, 200);
    }
    
}