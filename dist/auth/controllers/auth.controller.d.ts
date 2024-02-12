import { AuthUserDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { Response } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    authUser(authUserDto: AuthUserDto, res: Response): Promise<void>;
    forgotPassword(body: {
        email: string;
    }, res: Response): Promise<void>;
    resetPassword(body: {
        email: string;
        otp: number;
        newPassword: string;
    }, res: Response): Promise<void>;
}
