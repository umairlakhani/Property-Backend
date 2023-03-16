/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TenantSort, TenantSortAttr } from "src/tenant/model/tenant.model";
import { SuperAdminTenantService } from "./tenant.service";
export declare class SuperAdminTenantController {
    private superAdminTenantService;
    constructor(superAdminTenantService: SuperAdminTenantService);
    getAllTenant(limit?: number, offset?: number, search?: string, sortAttr?: TenantSortAttr, sort?: TenantSort, status?: string): Promise<{
        data: (import("src/tenant/schema/tenant.schema").Tenant & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    getTenant(id: string): Promise<import("src/tenant/schema/tenant.schema").Tenant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
