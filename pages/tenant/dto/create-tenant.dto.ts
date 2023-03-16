import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { IsTenantAlreadyExist } from "../constraints/isTenant-alreadyExists.constraint";
import { TenantStatus } from "../schema/tenant.schema";

export class CreateTenantDto {
    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    name:string

    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    @IsEmail()
    @IsTenantAlreadyExist({
        message: 'Tenant with this email already exists',
    })
    email:string

    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    password:string

    @ApiProperty({
        type:String,
        default: false
    })
    @IsNotEmpty()
    alert:boolean

    @ApiProperty({
        // type:String
        default:TenantStatus.active
    })
    @IsNotEmpty()
    @IsEnum(TenantStatus)
    status:TenantStatus

    @ApiProperty({
        type:String
    })
    @IsNotEmpty()
    contact:string

  
}