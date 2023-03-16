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
exports.SuperAdminTenantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tenant_schema_1 = require("../../tenant/schema/tenant.schema");
let SuperAdminTenantService = class SuperAdminTenantService {
    constructor(tenantModel) {
        this.tenantModel = tenantModel;
    }
    async getAllTenants(options, filter) {
        let limit = options.limit || 10;
        let offset = options.offset || 0;
        let sort = options.sort || 'DESC';
        let sortAttr = options.sortAttr || 'createdAt';
        let search = options.search || '';
        const regex = new RegExp(search.trim(), 'i');
        let query = this.tenantModel
            .find({
            $or: [{ name: { $regex: regex } }, { type: { $regex: regex } }],
        })
            .select('name email status password contact properties createdAt verification.isVerified ')
            .limit(limit)
            .skip(offset)
            .sort({ [sortAttr]: sort === 'DESC' ? -1 : 1 });
        if (filter) {
            if (filter.status != null) {
                query = query.find({ status: filter.status });
            }
        }
        const tenantsCount = await this.tenantModel.countDocuments();
        const tenants = await query.exec();
        return { data: tenants, count: tenantsCount };
    }
    async getTenantById(id) {
        const tenant = await this.tenantModel
            .findById(id)
            .select('name email contact status properties createdAt verification.isVerified verification.token');
        console.log(id);
        if (!tenant) {
            throw new common_1.BadRequestException('No tenant found with this id');
        }
        return tenant;
    }
};
SuperAdminTenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tenant_schema_1.Tenant.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], SuperAdminTenantService);
exports.SuperAdminTenantService = SuperAdminTenantService;
//# sourceMappingURL=tenant.service.js.map