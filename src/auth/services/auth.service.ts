import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { authParams } from "src/utils/types";
import { Repository } from "typeorm";

import * as md5 from 'md5';
import { JwtService } from "@nestjs/jwt";


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

        if(!user.isActive) {
            user.isActive = true;
            await this.userRepository.save(user);
        }

        const payload = { email: user.email };
        const token = this.jwtService.sign(payload);
        return token;
    }

    async forgotPassword(email: string) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const user = await this.userRepository.findOne({ where: { email } })

        if(!user) {
            throw new NotFoundException('User does not exist.');
        }

        user.otp = otp;
        user.otpTimestamp = new Date();
        await this.userRepository.save(user);

        return otp;
    }

    async resetPassword(email: string, otp: number, newPassword: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if(!user || user.otp !== otp) {
            throw new BadRequestException('Invalid OTP or User not found.')
        }

        const currentTimestamp = new Date();
        const otpTimestamp = user.otpTimestamp;
        const timeDiff = (currentTimestamp.getTime() - otpTimestamp.getTime()) / (1000*60);

        if(timeDiff > 2) {
            throw new BadRequestException('OTP expired')
        }

        user.password = md5(newPassword);
        user.otp = null;
        user.otpTimestamp = null;
        await this.userRepository.save(user);
    }
}