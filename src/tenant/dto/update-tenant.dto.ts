import { ApiProperty } from "@nestjs/swagger";
import { TenantStatus } from "../schema/tenant.schema";

export class UpdateTenantDto {
    @ApiProperty({
        type:String
    })
    name?:string

    @ApiProperty({
        type:String
    })
    alert?:boolean

    @ApiProperty({
        type:String
    })
    status?:TenantStatus

    @ApiProperty({
        type:String
    })
    contact?:string

}