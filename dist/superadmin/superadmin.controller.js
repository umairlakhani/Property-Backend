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
exports.SuperadminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tenant_service_1 = require("../tenant/tenant.service");
const user_service_1 = require("../user/user.service");
const create_superadmin_dto_1 = require("./dto/create-superadmin.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const superadmin_service_1 = require("./superadmin.service");
let SuperadminController = class SuperadminController {
    constructor(superAdminService, userService, tenantService) {
        this.superAdminService = superAdminService;
        this.userService = userService;
        this.tenantService = tenantService;
    }
    async create(createSuperAdmin) {
        return await this.superAdminService.createSuperAdmin(createSuperAdmin);
    }
    async superAdminLogin(superAdmin) {
        return await this.superAdminService.superAdminLogin(superAdmin);
    }
    async updatePass(forgotPassDto) {
        return await this.superAdminService.forgotPass(forgotPassDto);
    }
    async changePass(body) {
        return await this.superAdminService.changePassword(body.email, body.token, body.password, body.confirmPassword);
    }
};
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_superadmin_dto_1.CreateSuperAdminDto]),
    __metadata("design:returntype", Promise)
], SuperadminController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("superAdmin/login"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperadminController.prototype, "superAdminLogin", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], SuperadminController.prototype, "updatePass", null);
__decorate([
    (0, common_1.Post)("change-password"),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                email: { type: 'string' },
                token: { type: 'string' },
                password: { type: 'string' },
                confirmPassword: { type: 'string' }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperadminController.prototype, "changePass", null);
SuperadminController = __decorate([
    (0, swagger_1.ApiTags)('SuperAdmin'),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)('superadmin'),
    __metadata("design:paramtypes", [superadmin_service_1.SuperadminService,
        user_service_1.UserService,
        tenant_service_1.TenantService])
], SuperadminController);
exports.SuperadminController = SuperadminController;
//# sourceMappingURL=superadmin.controller.js.map