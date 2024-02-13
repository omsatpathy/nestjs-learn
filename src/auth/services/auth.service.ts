import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User";
import { authParams } from "src/utils/types";
import { Repository } from "typeorm";

import * as md5 from 'md5';
import { JwtService } from "@nestjs/jwt";
import { UserPassword } from "src/entities/UserPassword";
import { Otp } from "src/entities/Otp";


@Injectable() 
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserPassword) private userPasswordRepository: Repository<UserPassword>,
        @InjectRepository(Otp) private otpRepository: Repository<Otp>,
        private jwtService: JwtService
    ) {};

    async authUser(authUserDetails: authParams) {

        try {
            
            const { email, password } = authUserDetails;
            const user = await this.userPasswordRepository.findOne({ where: { email } });
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

        } catch (error) {
            
            throw new Error(error);

        }

    }

    async forgotPassword(email: string) {
        try {
            
            const userInUserRepository = await this.userRepository.findOne({ where: { email } });
            console.log(userInUserRepository);
            const userInUserPasswordRepository = await this.userPasswordRepository.findOne({ where: { user_id: userInUserRepository } });
            console.log(userInUserPasswordRepository)
    
            if(!userInUserRepository || !userInUserPasswordRepository.isActive) {
                throw new NotFoundException('userInUserPasswordRepository does not exist.');
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpTimestamp = new Date();

            const newUserInOtpRepository = this.otpRepository.create({ email, otp, otpTimestamp })
            const savedUserInOtpRepository = await this.otpRepository.save(newUserInOtpRepository);
    
            return savedUserInOtpRepository;

        } catch (error) {

            throw new Error(error);

        }

    }

    async resetPassword(email: string, otp: number, newPassword: string) {

        try {

            const userInUserRepository = await this.userRepository.findOne({ where: { email } });
            const userInUserPasswordRepository = await this.userPasswordRepository.findOne({ where: { user_id: userInUserRepository } });
            const userInOtpRepository = await this.otpRepository.findOne({ where: { email: userInUserRepository.email } });
            
            if(!userInUserRepository && userInOtpRepository.otp !== otp && !userInUserPasswordRepository.isActive) {
                throw new BadRequestException('Invalid OTP or User not found.')
            }
    
            const currentTimestamp = new Date();
            const otpTimestamp = userInOtpRepository.otpTimestamp;
            const timeDiff = (currentTimestamp.getTime() - otpTimestamp.getTime()) / (1000*60);
    
            if(timeDiff > 2) {
                throw new BadRequestException('OTP expired')
            }
    
            userInUserPasswordRepository.password = md5(newPassword);
            // userInOtpRepository.otp = null;
            // userInOtpRepository.otpTimestamp = null;

            await this.otpRepository.save(userInOtpRepository);
            await this.userPasswordRepository.save(userInUserPasswordRepository);
            
        } catch (error) {

            throw new Error(error);

        }

    }
}