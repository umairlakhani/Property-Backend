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
exports.SuperAdminTenantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tenant_model_1 = require("../../tenant/model/tenant.model");
const tenant_schema_1 = require("../../tenant/schema/tenant.schema");
const jwt_guards_1 = require("../guards/jwt-guards");
const tenant_service_1 = require("./tenant.service");
let SuperAdminTenantController = class SuperAdminTenantController {
    constructor(superAdminTenantService) {
        this.superAdminTenantService = superAdminTenantService;
    }
    async getAllTenant(limit, offset, search, sortAttr, sort, status) {
        return await this.superAdminTenantService.getAllTenants({
            limit,
            offset,
            search,
            sortAttr,
            sort,
        }, { status });
    }
    async getTenant(id) {
        return await this.superAdminTenantService.getTenantById(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)("get"),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortAttr', required: false, type: 'enum', enum: tenant_model_1.TenantSortAttr }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: 'enum', enum: tenant_model_1.TenantSort }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: 'enum', enum: tenant_schema_1.TenantStatus }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('sortAttr')),
    __param(4, (0, common_1.Query)('sort')),
    __param(5, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SuperAdminTenantController.prototype, "getAllTenant", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuperAdminTenantController.prototype, "getTenant", null);
SuperAdminTenantController = __decorate([
    (0, swagger_1.ApiTags)('Tenant'),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)('tenant'),
    __metadata("design:paramtypes", [tenant_service_1.SuperAdminTenantService])
], SuperAdminTenantController);
exports.SuperAdminTenantController = SuperAdminTenantController;
//# sourceMappingURL=tenant.controller.js.map