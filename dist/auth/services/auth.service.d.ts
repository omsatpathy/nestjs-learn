import { User } from "src/entities/User";
import { authParams } from "src/utils/types";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserPassword } from "src/entities/UserPassword";
import { Otp } from "src/entities/Otp";
export declare class AuthService {
    private userRepository;
    private userPasswordRepository;
    private otpRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, userPasswordRepository: Repository<UserPassword>, otpRepository: Repository<Otp>, jwtService: JwtService);
    authUser(authUserDetails: authParams): Promise<string>;
    forgotPassword(email: string): Promise<Otp>;
    resetPassword(email: string, otp: number, newPassword: string): Promise<void>;
}
