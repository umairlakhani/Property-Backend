import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateSuperAdminDto{
    @ApiProperty({
        type:String
    })
    name:string

    @ApiProperty({
        type:String
    })
    @IsEmail()
    email:string

    @ApiProperty({
        type:String
    })
    password:string
}