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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("../dtos/auth.dto");
const auth_service_1 = require("../services/auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    ;
    async authUser(authUserDto, res) {
        try {
            const token = await this.authService.authUser(authUserDto);
            const responseToSend = new sendResponse_1.CustomApiResponse(200, { message: 'Token generated and sent.', token });
            responseToSend.sendResponse(res);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async forgotPassword(body, res) {
        try {
            const savedUserInOtpRepository = await this.authService.forgotPassword(body.email);
            const responseToSend = new sendResponse_1.CustomApiResponse(200, { message: 'Otp sent', data: savedUserInOtpRepository });
            responseToSend.sendResponse(res);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async resetPassword(body, res) {
        try {
            const data = await this.authService.resetPassword(body.email, body.otp, body.newPassword);
            const responseToSend = new sendResponse_1.CustomApiResponse(200, { message: 'Password succesfully reset', data });
            responseToSend.sendResponse(res);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authUser", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map