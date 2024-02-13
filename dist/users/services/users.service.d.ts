import { User } from "src/entities/User";
import { UserPassword } from "src/entities/UserPassword";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";
export declare class UsersService {
    private userRepository;
    private userPasswordRepository;
    constructor(userRepository: Repository<User>, userPasswordRepository: Repository<UserPassword>);
    createUser(userDetails: CreateUserParams): Promise<User>;
    deleteUser(request: any): Promise<User>;
}
