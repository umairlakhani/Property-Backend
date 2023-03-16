"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supAdminModules = void 0;
const superadmin_module_1 = require("./superadmin.module");
const tenant_module_1 = require("./tenants/tenant.module");
const user_module_1 = require("./users/user.module");
exports.supAdminModules = [
    superadmin_module_1.SuperadminModule,
    tenant_module_1.SuperAdminTenantModule,
    user_module_1.SuperAdminUserModule
];
//# sourceMappingURL=super-admin.modules.js.map