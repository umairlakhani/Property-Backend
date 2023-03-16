"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperadminModule = void 0;
const common_1 = require("@nestjs/common");
const superadmin_controller_1 = require("./superadmin.controller");
const superadmin_service_1 = require("./superadmin.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const super_admin_schema_1 = require("./schema/super-admin.schema");
const jwt_guards_1 = require("./guards/jwt-guards");
const jwt_strategy_1 = require("./guards/jwt-strategy");
const tenant_module_1 = require("../tenant/tenant.module");
const tenant_module_2 = require("./tenants/tenant.module");
const user_module_2 = require("./users/user.module");
let SuperadminModule = class SuperadminModule {
};
SuperadminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'SuperAdmin', schema: super_admin_schema_1.SuperAdminSchema }]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => tenant_module_2.SuperAdminTenantModule),
            (0, common_1.forwardRef)(() => user_module_2.SuperAdminUserModule),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_KEY'),
                    signOptions: { expiresIn: '1d' },
                }),
            })
        ],
        controllers: [superadmin_controller_1.SuperadminController],
        providers: [superadmin_service_1.SuperadminService, jwt_guards_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy],
        exports: [superadmin_service_1.SuperadminService]
    })
], SuperadminModule);
exports.SuperadminModule = SuperadminModule;
//# sourceMappingURL=superadmin.module.js.map