import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { authParams } from "src/utils/types";
import { Repository } from "typeorm";

import * as md5 from 'md5';
import { JwtService } from "@nestjs/jwt";
import { sendResponse } from "src/utils/sendResponse";


@Injectable() 
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {};

    async authUser(authUserDetails: authParams) {
        const { email, password } = authUserDetails;
        const user = await this.userRepository.findOne({ where: { email } });
        const hashedUserPassword = md5(password);

        if(!user || hashedUserPassword !== user.password) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email };
        const token = this.jwtService.sign(payload);

        sendResponse({ message: 'Token sent.', token }, 200);
    }
}