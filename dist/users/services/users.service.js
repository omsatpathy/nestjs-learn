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
const UserPassword_1 = require("../../entities/UserPassword");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository, userPasswordRepository) {
        this.userRepository = userRepository;
        this.userPasswordRepository = userPasswordRepository;
    }
    ;
    async createUser(userDetails) {
        try {
            const { password, ...userToBeCreated } = userDetails;
            const newUserInUserRepo = this.userRepository.create({ ...userToBeCreated });
            const savedUserInUserRepo = await this.userRepository.save(newUserInUserRepo);
            const { email } = savedUserInUserRepo;
            const newUserInUserPasswordRepo = this.userPasswordRepository.create({ user_id: savedUserInUserRepo, email, password });
            const savedUserInUserPasswordRepo = await this.userPasswordRepository.save(newUserInUserPasswordRepo);
            return savedUserInUserRepo;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteUser(request) {
        try {
            const { email } = request.user;
            const deletedUser = await this.userPasswordRepository.findOne({ where: { email } });
            if (!deletedUser || !deletedUser.isActive) {
                throw new common_1.NotFoundException('User does not exist or already deactivated.');
            }
            deletedUser.isActive = false;
            await this.userPasswordRepository.save(deletedUser);
            const deletedUserDetails = await this.userRepository.findOne({ where: { email } });
            return deletedUserDetails;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(UserPassword_1.UserPassword)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map