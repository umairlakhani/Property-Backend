import { ApiProperty } from "@nestjs/swagger";
import { ValidateIf } from "class-validator";
import { IsUserIdAlreadyExist } from "src/user/constraints/isUserId-alreadyExists.constraint";
import { ApartmentFloorPlan, HouseFloorPlan, Resedenial, Status, Type } from "../schema/property.schema";
class ApartmentFloorDto{
    @ApiProperty({
        type:String
    })
    description:string

    @ApiProperty({
        type:String
    })
    amenities:string
}

class HouseFloorDto{
    @ApiProperty({
        type:String
    })
    description:string

    @ApiProperty({
        type:String
    })
    amenities:string
}

class ApartmentFloorPlanDto{
    @ApiProperty({
        type:String
    })
    floor:string

    @ApiProperty({
        type:ApartmentFloorDto
    })
    apartmentFloor:ApartmentFloorDto
}

class HouseFloorPlanDto{
    @ApiProperty({
        type:String
    })
    noOfFloors:string

    @ApiProperty({
        type:HouseFloorDto
    })
    floor1:HouseFloorDto

    @ApiProperty({
        type:HouseFloorDto
    })
    floor2:HouseFloorDto
    
    @ApiProperty({
        type:HouseFloorDto
    })
    floor3:HouseFloorDto
}

class Location{
    @ApiProperty({
        type:String
    })
    address:string

    @ApiProperty({
        type:String
    })
    pinLocation:string
}

export class CreatePropertyDto{
    @ApiProperty({
        type:String
    })
    description:string

    @ApiProperty({
        type:String
    })
    city:string

    @ApiProperty({
        type:String
    })
    type:Type

    @ApiProperty({
        type:String
        // type:Resedenial

    })
    resedential:Resedenial

    @ApiProperty({
        type:Boolean,
        default:true,
        required:true
    })
    rentPurpose:boolean

    @ApiProperty({
        type:Number,
    })
    // @ValidateIf((object,value)=>object.rentPurpose===true)
    rent:number

    @ApiProperty({
        type:Date,
        default: new Date()
    })
    availableFrom:Date

    @ApiProperty({
        type:Boolean,
        default:false,
        required:false
    })
    sellPurpose:boolean

    @ApiProperty({
        type:Number,
    })

    // @ValidateIf((object,value)=>object.sellPurpose===true)
    price:number

    @ApiProperty({
        type:Boolean,
        default:true,
        required:false
    })
    forApartment:boolean

    @ApiProperty({
        type:ApartmentFloorPlanDto,
    })
    apartmentFloorPlan:ApartmentFloorPlanDto

    @ApiProperty({
        type:Boolean,
        default:false,
        required:false
    })
    forHouse:boolean

    @ApiProperty({
        type:HouseFloorPlanDto,
    })
    houseFloorPlan:HouseFloorPlanDto

    // @ApiProperty({
    //     type:String
    // })
    // photos:string[]

    @ApiProperty({
        type:String
    })
    area:string

    @ApiProperty({
        type:'array',
        nullable:false,
        items: {
            type: 'string',
            format: 'binary',
        },
                    
    
    })
    files: any[]
    // @ApiProperty({
    //     // type:Status,
    //     // default:Status.active
    // })
    // status:Status

    // @ApiProperty({
    //     type:Location
    // })
    // location:Location





    





}