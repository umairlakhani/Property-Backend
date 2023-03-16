import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Sort, SortAttr } from "src/user/model/user.model";
import { Status } from "src/user/schema/user.schema";
import { JwtAuthGuard } from "../guards/jwt-guards";
import { SuperAdminUserService } from "./user.service";
@ApiTags('User')
@ApiBearerAuth('defaultBearerAuth')
@Controller('user')
export class SuperAdminUserController{
    constructor(
        private superAdminUserService:SuperAdminUserService
    ){}
    @UseGuards(JwtAuthGuard)
    @Get("get")
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: SortAttr })
    @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: Sort })
    @ApiQuery({ name: 'status', required: false, type: 'enum', enum: Status })
    async getAll(
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
        @Query('search') search?: string,
        @Query('sortAttr') sortAttr?: SortAttr,
        @Query('sort') sort?: Sort,
        @Query('status') status?: string
    ){
        return await this.superAdminUserService.getAllUsers({
            limit,
            offset,
            search,
            sortAttr,
            sort,
            },{status})
    }
    @UseGuards(JwtAuthGuard)
    @Get("get/:id")
    async getUser(@Param('id') id:string){
        return await this.superAdminUserService.getUserById(id);
    }

}