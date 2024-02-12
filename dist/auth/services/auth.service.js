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
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    ;
    async authUser(authUserDetails) {
        const { email, password } = authUserDetails;
        const user = await this.userRepository.findOne({ where: { email } });
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
    async forgotPassword(email) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User does not exist.');
        }
        user.otp = otp;
        user.otpTimestamp = new Date();
        await this.userRepository.save(user);
        return otp;
    }
    async resetPassword(email, otp, newPassword) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || user.otp !== otp) {
            throw new common_1.BadRequestException('Invalid OTP or User not found.');
        }
        const currentTimestamp = new Date();
        const otpTimestamp = user.otpTimestamp;
        const timeDiff = (currentTimestamp.getTime() - otpTimestamp.getTime()) / (1000 * 60);
        if (timeDiff > 2) {
            throw new common_1.BadRequestException('OTP expired');
        }
        user.password = md5(newPassword);
        user.otp = null;
        user.otpTimestamp = null;
        await this.userRepository.save(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map