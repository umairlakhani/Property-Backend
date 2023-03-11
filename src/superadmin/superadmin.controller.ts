import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TenantSort, TenantSortAttr } from 'src/tenant/model/tenant.model';
import { TenantStatus } from 'src/tenant/schema/tenant.schema';
import { TenantService } from 'src/tenant/tenant.service';
import { Sort, SortAttr } from 'src/user/model/user.model';
import { Status } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateSuperAdminDto } from './dto/create-superadmin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtAuthGuard } from './guards/jwt-guards';
import { SuperadminService } from './superadmin.service';

export interface ISuperadmin{
    email:string,
    password:string
}

@ApiTags('SuperAdmin')
@ApiBearerAuth('defaultBearerAuth')
@Controller('superadmin')
export class SuperadminController {
    constructor(
        private superAdminService:SuperadminService,
        private userService: UserService,
        private tenantService: TenantService

    ){}

    @Post("create")
    async create(
        @Body() createSuperAdmin:CreateSuperAdminDto
    ){
        return await this.superAdminService.createSuperAdmin(createSuperAdmin)

    }

    @Post("superAdmin/login")
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {type:'string'},
                password: {type:'string'}
            }
        }
    })
    async superAdminLogin(@Body() superAdmin:ISuperadmin ){
        return await this.superAdminService.superAdminLogin(superAdmin)
    }
     // @UseGuards(JwtAuthGuard)
     @Post("forgot-password")
     async updatePass(
         @Body() forgotPassDto:ForgotPasswordDto
     ){
         return await this.superAdminService.forgotPass(forgotPassDto)
     }
     // @UseGuards(JwtAuthGuard)
     @Post("change-password")
     @ApiBody({
         schema:{
             properties:{
                 email: {type:'string'},
                 token: {type:'string'},
                 password: {type: 'string'},
                 confirmPassword: {type: 'string'}
             }
         }
     })
     async changePass(@Body() body:{email:string,token:string,password:string,confirmPassword:string}){
         return await this.superAdminService.changePassword(body.email,body.token,body.password,body.confirmPassword)
     } 

    // @UseGuards(JwtAuthGuard)
    // @Get("getAll/users")
    // @ApiQuery({ name: 'limit', required: false, type: Number })
    // @ApiQuery({ name: 'offset', required: false, type: Number })
    // @ApiQuery({ name: 'search', required: false, type: String })
    // @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: SortAttr })
    // @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: Sort })
    // @ApiQuery({ name: 'status', required: false, type: 'enum', enum: Status })
    // async getAll(
    //     @Query('limit') limit?: number,
    //     @Query('offset') offset?: number,
    //     @Query('search') search?: string,
    //     @Query('sortAttr') sortAttr?: SortAttr,
    //     @Query('sort') sort?: Sort,
    //     @Query('status') status?: string
    // ){
    //     return await this.userService.getAllUsers({
    //         limit,
    //         offset,
    //         search,
    //         sortAttr,
    //         sort,
    //         },{status})
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get("getAll/tenants")
    // @ApiQuery({ name: 'limit', required: false, type: Number })
    // @ApiQuery({ name: 'offset', required: false, type: Number })
    // @ApiQuery({ name: 'search', required: false, type: String })
    // @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: TenantSortAttr })
    // @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: TenantSort })
    // @ApiQuery({ name: 'status', required: false, type: 'enum', enum: TenantStatus })
    // async getAllTenant(
    //     @Query('limit') limit?: number,
    //     @Query('offset') offset?: number,
    //     @Query('search') search?: string,
    //     @Query('sortAttr') sortAttr?: TenantSortAttr,
    //     @Query('sort') sort?: TenantSort,
    //     @Query('status') status?: string
    // ){
    //     return await this.tenantService.getAllTenants({
    //         limit,
    //         offset,
    //         search,
    //         sortAttr,
    //         sort,
    //         },{status})
    // }


    // @UseGuards(JwtAuthGuard)
    // @Get("getUser/:id")
    // async getUser(@Param('id') id:string){
    //     return await this.userService.getUserById(id);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get("getTenant/:id")
    // async getTenant(@Param('id') id:string){
    //     return await this.tenantService.getTenantById(id);
    // }
}
