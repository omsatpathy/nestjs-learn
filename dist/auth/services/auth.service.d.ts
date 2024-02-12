import { User } from "src/entities/User";
import { authParams } from "src/utils/types";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    authUser(authUserDetails: authParams): Promise<string>;
}
