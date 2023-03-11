import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { IsUserAlreadyExist } from "../constraints/isUser-alreadyExists.constraint";
import { Status, Type } from "../schema/user.schema";

export class CreateUserDto{
    @ApiProperty({
        type:String,
    })
    @IsNotEmpty()
     name:string;
            
     @ApiProperty({
        // type:Status,
        default:Status.active
    })
    @IsEnum(Status)
     status:Status;

    @ApiProperty({
        type:String,
    })
    @IsNotEmpty()
    @IsEmail()
    @IsUserAlreadyExist({
        message: 'User with this email already exists',
    })
     email:string;

     @ApiProperty({
        type:String,
    })
    @MinLength(8)
     password:string;

    @ApiProperty({
        type:String,
    })
    @IsNotEmpty()
     contact:string;

    //  @ApiProperty({
    //     type:Boolean,
    //     default:false
    //  })
    //  isVerified?:boolean

     @ApiProperty({
        type:String,
    })
    @IsEnum(Type)
     type:Type;
     
}