import { SuperadminModule } from "./superadmin.module";
import { SuperAdminTenantModule } from "./tenants/tenant.module";
import { SuperAdminUserModule } from "./users/user.module";

export const supAdminModules = [
    SuperadminModule,
    SuperAdminTenantModule,
    SuperAdminUserModule
]

