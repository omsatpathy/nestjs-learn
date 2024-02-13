"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../entities/User");
const typeorm_2 = require("typeorm");
const md5 = require("md5");
const jwt_1 = require("@nestjs/jwt");
const UserPassword_1 = require("../../entities/UserPassword");
const Otp_1 = require("../../entities/Otp");
let AuthService = class AuthService {
    constructor(userRepository, userPasswordRepository, otpRepository, jwtService) {
        this.userRepository = userRepository;
        this.userPasswordRepository = userPasswordRepository;
        this.otpRepository = otpRepository;
        this.jwtService = jwtService;
    }
    ;
    async authUser(authUserDetails) {
        try {
            const { email, password } = authUserDetails;
            const user = await this.userPasswordRepository.findOne({ where: { email } });
            const hashedUserPassword = md5(password);
            if (!user || hashedUserPassword !== user.password) {
                throw new common_1.UnauthorizedException();
            }
            if (!user.isActive) {
                user.isActive = true;
                await this.userRepository.save(user);
            }
            const payload = { email: user.email };
            const token = this.jwtService.sign(payload);
            return token;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async forgotPassword(email) {
        try {
            const userInUserRepository = await this.userRepository.findOne({ where: { email } });
            console.log(userInUserRepository);
            const userInUserPasswordRepository = await this.userPasswordRepository.findOne({ where: { user_id: userInUserRepository } });
            console.log(userInUserPasswordRepository);
            if (!userInUserRepository || !userInUserPasswordRepository.isActive) {
                throw new common_1.NotFoundException('userInUserPasswordRepository does not exist.');
            }
            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpTimestamp = new Date();
            const newUserInOtpRepository = this.otpRepository.create({ email, otp, otpTimestamp });
            const savedUserInOtpRepository = await this.otpRepository.save(newUserInOtpRepository);
            return savedUserInOtpRepository;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async resetPassword(email, otp, newPassword) {
        try {
            const userInUserRepository = await this.userRepository.findOne({ where: { email } });
            const userInUserPasswordRepository = await this.userPasswordRepository.findOne({ where: { user_id: userInUserRepository } });
            const userInOtpRepository = await this.otpRepository.findOne({ where: { email: userInUserRepository.email } });
            if (!userInUserRepository && userInOtpRepository.otp !== otp && !userInUserPasswordRepository.isActive) {
                throw new common_1.BadRequestException('Invalid OTP or User not found.');
            }
            const currentTimestamp = new Date();
            const otpTimestamp = userInOtpRepository.otpTimestamp;
            const timeDiff = (currentTimestamp.getTime() - otpTimestamp.getTime()) / (1000 * 60);
            if (timeDiff > 2) {
                throw new common_1.BadRequestException('OTP expired');
            }
            userInUserPasswordRepository.password = md5(newPassword);
            await this.otpRepository.save(userInOtpRepository);
            await this.userPasswordRepository.save(userInUserPasswordRepository);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(UserPassword_1.UserPassword)),
    __param(2, (0, typeorm_1.InjectRepository)(Otp_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map