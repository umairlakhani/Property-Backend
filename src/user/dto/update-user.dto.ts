import { ApiProperty } from "@nestjs/swagger"
import { IsEnum } from "class-validator"
import { Status } from "../schema/user.schema"

export class UpdateUserDto{
    @ApiProperty({
        type:String
    })
    name?:string

    @ApiProperty({
        type:'enum',
        default:Status.active
    })
    @IsEnum(Status)
    status?:Status

    @ApiProperty({
        type:String
    })
    contact?:string
}