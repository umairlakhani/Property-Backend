import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export enum Type{
    commercial = "commercial",
    resedential = "resedential",
    industrial = "industrial"
}
export enum Resedenial{
    apartment = "apartment",
    house = "house"
}

export enum Status{
    active = "active",
    rented = "rented",
    sold = "sold",
    inActive = "inActive",
}

@Schema({id:false})
export class HouseFloor{
    @Prop({})
    description:string

    @Prop({})
    amenities:string
}

@Schema({id:false})
export class ApartmentFloor{
    @Prop({})
    description:string

    @Prop({})
    amenities:string
}

@Schema({id:false})
export class ApartmentFloorPlan{
    @Prop({})
    floor:string

    @Prop({})
    apartmentFloor:ApartmentFloor
}

@Schema({id:false})
export class HouseFloorPlan{
    @Prop({})
    noOfFloors:string

    @Prop({})
    floor1:HouseFloor 

    @Prop({})
    floor2:HouseFloor 

    @Prop({})
    floor3:HouseFloor 
}

@Schema({id:false})
class Location{
    @Prop({
        nullable:false
    })
    address:string

    @Prop({
        nullable:false
    })
    pinLocation:string
}



//Main Schema
@Schema({timestamps:true})
export class Property extends Document {
    @Prop({
        nullable:false
    })
    description:string

    @Prop({
        nullable:false
    })
    city:string

    // @Prop({
    //     nullable:false
    // })
    // agentId:string

    @Prop({
        nullable:false,
        ref: 'UserSchema',
    })
    agentId:string

    @Prop({
        nullable:false,
        ref: 'UserSchema',
    })
    landlordId:string

    @Prop({
        required:true,
        default:Type.resedential
        // enum:Type
    })
    type:Type

    @Prop({
        required:true,
        default: Resedenial.apartment
        // enum:Resedenial
    })
    resedential:Resedenial

    @Prop({
        required:true,
        default:false
    })
    forApartment:boolean

    @Prop({
        required:true,
        default:false
    })
    forHouse:boolean

    @Prop({
        type:Object,
        required: function(){
            return this.forApartment
        }
    })
    apartmentFloorPlan:ApartmentFloorPlan
    
    @Prop({
        type:Object,
        required: function(){
            return this.forHouse
        }
    })
    houseFloorPlan:HouseFloorPlan

    @Prop({
        type:Boolean,
        default:false
    })
    rentPurpose:boolean

    @Prop({
        type:Number || null,
        required:function(){
            return this.rentPurpose
        }
    })
    rent:number | null

    @Prop({
        type:Boolean,
        default:false
    })
    sellPurpose:boolean

    @Prop({
        type:Number || null,
        required:function(){
            return this.sellPurpose
        }
    })
    price:number | null

    @Prop({
        nullable:false
    })
    files:string[]
    
    @Prop({
        nullable:false
    })
    area:string

    @Prop({
        nullable:false
    })
    location:Location

    @Prop({
        type:Date,
        required:function(){
            return this.rentPurpose
        }
    })
    availableFrom:Date

    @Prop({
        nullable:false
    })
    isAvailable:boolean

    @Prop({
        nullable:false,
        default: Status.active
    })
    status:Status

    @Prop({
        nullable:false
    })
    favorites:string[]

    @Prop({
        ref: 'InspectionSchema',
        
    })
    inspection:string

    @Prop({
        ref: 'PaymentSchema',
        
    })
    payment:string

    @Prop({})
    reviews:string

    @Prop({})
    ratings:string

    @Prop({
        default:false
    })
    sold:boolean  

    
}
export const PropertySchema = SchemaFactory.createForClass(Property)