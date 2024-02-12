import { Body, Controller, Post } from "@nestjs/common";
import { AuthUserDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";


@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {};

    @Post()
    async authUser(@Body() authUserDto: AuthUserDto) {
        return this.authService.authUser(authUserDto);
    }
    
}