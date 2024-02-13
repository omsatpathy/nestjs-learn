import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { User } from "src/entities/User";
import { UserPassword } from "src/entities/UserPassword";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserPassword) private userPasswordRepository: Repository<UserPassword>
    ) {};

    async createUser(userDetails: CreateUserParams) {

        try {
            const { password, ...userToBeCreated } = userDetails;

            const newUserInUserRepo = this.userRepository.create({ ...userToBeCreated });
            const savedUserInUserRepo = await this.userRepository.save(newUserInUserRepo); 
            const { email } = savedUserInUserRepo;

            const newUserInUserPasswordRepo = this.userPasswordRepository.create({ user_id: savedUserInUserRepo, email, password })
            const savedUserInUserPasswordRepo = await this.userPasswordRepository.save(newUserInUserPasswordRepo);

            return savedUserInUserRepo;

        } catch (error) {
            
            throw new Error(error);

        }

    }

    async deleteUser(request: any) {
        try {

            const { email } = request.user
            const deletedUser = await this.userPasswordRepository.findOne({ where: { email } });
    
            if(!deletedUser || !deletedUser.isActive) {
                throw new NotFoundException('User does not exist or already deactivated.')
            }
            deletedUser.isActive = false;
            await this.userPasswordRepository.save(deletedUser);

            const deletedUserDetails = await this.userRepository.findOne({ where: { email } });

            return deletedUserDetails;

        } catch (error) {
            throw new Error(error);
        }

    }
}
