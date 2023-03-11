import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TenantSchema } from "src/tenant/schema/tenant.schema";
import { TenantModule } from "src/tenant/tenant.module";
import { SuperAdminTenantController } from "./tenant.controller";
import { SuperAdminTenantService } from "./tenant.service";

@Module({
    imports:[
      MongooseModule.forFeature([{name:'Tenant',schema: TenantSchema}]),


    ],
    controllers:[SuperAdminTenantController],
    providers: [SuperAdminTenantService],
    exports: [SuperAdminTenantService]
})
export class SuperAdminTenantModule{}