"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminTenantModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tenant_schema_1 = require("../../tenant/schema/tenant.schema");
const tenant_controller_1 = require("./tenant.controller");
const tenant_service_1 = require("./tenant.service");
let SuperAdminTenantModule = class SuperAdminTenantModule {
};
SuperAdminTenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Tenant', schema: tenant_schema_1.TenantSchema }]),
        ],
        controllers: [tenant_controller_1.SuperAdminTenantController],
        providers: [tenant_service_1.SuperAdminTenantService],
        exports: [tenant_service_1.SuperAdminTenantService]
    })
], SuperAdminTenantModule);
exports.SuperAdminTenantModule = SuperAdminTenantModule;
//# sourceMappingURL=tenant.module.js.map