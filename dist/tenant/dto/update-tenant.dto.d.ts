import { TenantStatus } from "../schema/tenant.schema";
export declare class UpdateTenantDto {
    name?: string;
    alert?: boolean;
    status?: TenantStatus;
    contact?: string;
}
