import mongoose from 'mongoose';
import { ITenantFilters, ITenantPagination } from 'src/tenant/model/tenant.model';
import { Tenant } from 'src/tenant/schema/tenant.schema';
export declare class SuperAdminTenantService {
    private tenantModel;
    constructor(tenantModel: mongoose.Model<Tenant>);
    getAllTenants(options: ITenantPagination, filter: ITenantFilters): Promise<{
        data: (Tenant & {
            _id: mongoose.Types.ObjectId;
        })[];
        count: number;
    }>;
    getTenantById(id: string): Promise<Tenant & {
        _id: mongoose.Types.ObjectId;
    }>;
}
