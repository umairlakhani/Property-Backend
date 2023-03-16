import { TenantStatus } from "../schema/tenant.schema";
export declare class CreateTenantDto {
    name: string;
    email: string;
    password: string;
    alert: boolean;
    status: TenantStatus;
    contact: string;
}
