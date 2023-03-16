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
exports.SuperAdminUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../../user/model/user.model");
const user_schema_1 = require("../../user/schema/user.schema");
const jwt_guards_1 = require("../guards/jwt-guards");
const user_service_1 = require("./user.service");
let SuperAdminUserController = class SuperAdminUserController {
    constructor(superAdminUserService) {
        this.superAdminUserService = superAdminUserService;
    }
    async getAll(limit, offset, search, sortAttr, sort, status) {
        return await this.superAdminUserService.getAllUsers({
            limit,
            offset,
            search,
            sortAttr,
            sort,
        }, { status });
    }
    async getUser(id) {
        return await this.superAdminUserService.getUserById(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)("get"),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortAttr', required: false, type: 'enum', enum: user_model_1.SortAttr }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: 'enum', enum: user_model_1.Sort }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: 'enum', enum: user_schema_1.Status }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('sortAttr')),
    __param(4, (0, common_1.Query)('sort')),
    __param(5, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminUserController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuperAdminUserController.prototype, "getUser", null);
SuperAdminUserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.SuperAdminUserService])
], SuperAdminUserController);
exports.SuperAdminUserController = SuperAdminUserController;
//# sourceMappingURL=user.controller.js.map