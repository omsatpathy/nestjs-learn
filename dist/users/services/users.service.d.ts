import { User } from "src/entities/User";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userDetails: CreateUserParams): Promise<{
        email: string;
        first_name: string;
        last_name: string;
        dob: Date;
        createdAt: Date;
    }>;
    deleteUser(request: any): Promise<import("typeorm").DeleteResult | "User does not exist.">;
}
