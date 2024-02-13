import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthUserDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
import { CustomApiResponse } from "src/utils/sendResponse";


@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {};

    @Post()
    async authUser(@Body() authUserDto: AuthUserDto, @Res() res: Response) {
        try {
            const token = await this.authService.authUser(authUserDto);
            const responseToSend = new CustomApiResponse(200, { message: 'Token generated and sent.', token });
            responseToSend.sendResponse(res);

        } catch (error) {
            throw new Error(error);
        }

    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string },  @Res() res: Response) {
        try {
            
            const savedUserInOtpRepository = await this.authService.forgotPassword(body.email);
            const responseToSend = new CustomApiResponse(200, { message: 'Otp sent', data: savedUserInOtpRepository });
            responseToSend.sendResponse(res);

        } catch (error) {
            throw new Error(error);
        }

    }

    @Post('reset-password') 
    async resetPassword(@Body() body: { email: string, otp: number, newPassword: string },  @Res() res: Response) {
        try {
            
            const data = await this.authService.resetPassword(body.email, body.otp, body.newPassword);
            const responseToSend = new CustomApiResponse(200, { message: 'Password succesfully reset', data });
            responseToSend.sendResponse(res);

        } catch (error) {
            throw new Error(error);
        }
    }
    
}