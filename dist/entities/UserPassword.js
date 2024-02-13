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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const md5 = require("md5");
let UserPassword = class UserPassword {
    hashPasswordBeforeInsert() {
        this.password = md5(this.password);
    }
    updateUpdatedAtBeforeInsert() {
        this.updatedAt = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    }
};
exports.UserPassword = UserPassword;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPassword.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], UserPassword.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserPassword.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserPassword.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserPassword.prototype, "hashPasswordBeforeInsert", null);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: false, type: 'boolean' }),
    __metadata("design:type", Boolean)
], UserPassword.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }),
    __metadata("design:type", Date)
], UserPassword.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` }),
    __metadata("design:type", Date)
], UserPassword.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserPassword.prototype, "updateUpdatedAtBeforeInsert", null);
exports.UserPassword = UserPassword = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_Passwords' })
], UserPassword);
//# sourceMappingURL=UserPassword.js.map