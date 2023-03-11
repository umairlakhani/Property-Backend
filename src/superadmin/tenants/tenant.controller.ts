import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TenantSort, TenantSortAttr } from "src/tenant/model/tenant.model";
import { TenantStatus } from "src/tenant/schema/tenant.schema";
import { TenantService } from "src/tenant/tenant.service";
import { JwtAuthGuard } from "../guards/jwt-guards";
import { SuperAdminTenantService } from "./tenant.service";
@ApiTags('Tenant')
@ApiBearerAuth('defaultBearerAuth')
@Controller('tenant')
export class SuperAdminTenantController{
    constructor(
        private superAdminTenantService:SuperAdminTenantService
    ){}
    @UseGuards(JwtAuthGuard)
    @Get("get")
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: TenantSortAttr })
    @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: TenantSort })
    @ApiQuery({ name: 'status', required: false, type: 'enum', enum: TenantStatus })
    async getAllTenant(
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
        @Query('search') search?: string,
        @Query('sortAttr') sortAttr?: TenantSortAttr,
        @Query('sort') sort?: TenantSort,
        @Query('status') status?: string
    ){
        return await this.superAdminTenantService.getAllTenants({
            limit,
            offset,
            search,
            sortAttr,
            sort,
            },{status})
    }
    @UseGuards(JwtAuthGuard)
    @Get("get/:id")
    async getTenant(@Param('id') id:string){
        return await this.superAdminTenantService.getTenantById(id)
    }
    // @UseGuards(JwtAuthGuard)
    // @Get("getUser/:id")
    // async getUser(@Param('id') id:string){
    //     return await this.userService.getUserById(id);
    // }
}