import { AuthUserDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    authUser(authUserDto: AuthUserDto): Promise<string>;
}
