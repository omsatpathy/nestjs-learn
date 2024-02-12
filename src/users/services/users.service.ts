import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { User } from "src/entities/User";
import { sendResponse } from "src/utils/sendResponse";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {};

    async createUser(userDetails: CreateUserParams, response: Response) {
        const newUser = this.userRepository.create({ ...userDetails });
        const savedUser = await this.userRepository.save(newUser);

        const { id, password, ...createdUserDetails } = savedUser;
        return createdUserDetails;
    }

    async deleteUser(request: any, response: Response) {
        const { email } = request.user
        const deletedUser = await this.userRepository.findOne({ where: { email } });

        if(!deletedUser || !deletedUser.isActive) {
            throw new NotFoundException('User does not exist or already deactivated.')
        }

        deletedUser.isActive = false;
        await this.userRepository.save(deletedUser);
        const { password, id, otp, otpTimestamp, ...deletedUserDetails } = deletedUser;
        return deletedUserDetails;
    }
}
