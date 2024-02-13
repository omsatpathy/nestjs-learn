"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./services/auth.service");
const User_1 = require("../entities/User");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const cronJobs_service_1 = require("./services/cronJobs.service");
const schedule_1 = require("@nestjs/schedule");
const UserPassword_1 = require("../entities/UserPassword");
const Otp_1 = require("../entities/Otp");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User, UserPassword_1.UserPassword, Otp_1.Otp]), config_1.ConfigModule.forRoot({
                isGlobal: true
            }), jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' }
            }), schedule_1.ScheduleModule.forRoot()],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, cronJobs_service_1.OtpCleanupService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map