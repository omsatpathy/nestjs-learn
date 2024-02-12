import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {};

    async createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({ ...userDetails });
        const savedUser = await this.userRepository.save(newUser);

        const { id, password, ...createdUserDetails } = savedUser;
        return createdUserDetails;
    }

    async deleteUser(request) {
        const { email } = request.user
        const deletedUser = await this.userRepository.delete({ email });
        if(deletedUser.affected === 0) {
            return "User does not exist."
        }
        return deletedUser;
    }
}
