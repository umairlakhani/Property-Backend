import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  ITenantFilters,
  ITenantPagination,
} from 'src/tenant/model/tenant.model';
import { Tenant } from 'src/tenant/schema/tenant.schema';

@Injectable()
export class SuperAdminTenantService {
  constructor(
    @InjectModel(Tenant.name)
    private tenantModel: mongoose.Model<Tenant>,
  ) {}
  async getAllTenants(options: ITenantPagination, filter: ITenantFilters) {
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
      .select(
        'name email status password contact properties createdAt verification.isVerified ',
      )
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
  async getTenantById(id: string) {
    const tenant = await this.tenantModel
      .findById(id)
      .select(
        'name email contact status properties createdAt verification.isVerified verification.token',
      );
    console.log(id);
    if (!tenant) {
      throw new BadRequestException('No tenant found with this id');
    }
    return tenant;
  }
}
