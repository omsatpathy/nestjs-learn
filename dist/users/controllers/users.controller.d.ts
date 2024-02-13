import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/createUser.dto";
import { Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto, res: Response): Promise<void>;
    deleteUser(request: any, res: Response): Promise<void>;
}
