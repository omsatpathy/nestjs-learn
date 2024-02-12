import { Response } from "express";
import { User } from "src/entities/User";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userDetails: CreateUserParams, response: Response): Promise<{
        email: string;
        first_name: string;
        last_name: string;
        dob: Date;
        isActive: boolean;
        otp: number;
        otpTimestamp: Date;
        createdAt: Date;
    }>;
    deleteUser(request: any, response: Response): Promise<{
        email: string;
        first_name: string;
        last_name: string;
        dob: Date;
        isActive: boolean;
        createdAt: Date;
    }>;
}
