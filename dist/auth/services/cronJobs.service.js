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
exports.OtpCleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const Otp_1 = require("../../entities/Otp");
const typeorm_2 = require("typeorm");
let OtpCleanupService = class OtpCleanupService {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    ;
    async cleanExpiredOtps() {
        await this.otpRepository.createQueryBuilder()
            .delete()
            .from(Otp_1.Otp)
            .where('otp IS NOT NULL AND otpTimestamp IS NOT NULL')
            .execute();
    }
};
exports.OtpCleanupService = OtpCleanupService;
__decorate([
    (0, schedule_1.Cron)('*/2 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OtpCleanupService.prototype, "cleanExpiredOtps", null);
exports.OtpCleanupService = OtpCleanupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Otp_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OtpCleanupService);
//# sourceMappingURL=cronJobs.service.js.map