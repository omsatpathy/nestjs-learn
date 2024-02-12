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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../entities/User");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    async createUser(userDetails, response) {
        const newUser = this.userRepository.create({ ...userDetails });
        const savedUser = await this.userRepository.save(newUser);
        const { id, password, ...createdUserDetails } = savedUser;
        return createdUserDetails;
    }
    async deleteUser(request, response) {
        const { email } = request.user;
        const deletedUser = await this.userRepository.findOne({ where: { email } });
        if (!deletedUser || !deletedUser.isActive) {
            throw new common_1.NotFoundException('User does not exist or already deactivated.');
        }
        deletedUser.isActive = false;
        await this.userRepository.save(deletedUser);
        const { password, id, otp, otpTimestamp, ...deletedUserDetails } = deletedUser;
        return deletedUserDetails;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map