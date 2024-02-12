import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/createUser.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        email: string;
        first_name: string;
        last_name: string;
        dob: Date;
        createdAt: Date;
    }>;
    deleteUser(request: any): Promise<import("typeorm").DeleteResult | "User does not exist.">;
}
