import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum TenantStatus{
    active = "active",
    notActive = "notActive"
}


@Schema({id:false})
class verification {
    @Prop({default:false})
    isVerified:boolean;

    @Prop({})
    token:string;

    @Prop({})
    expiry:Date
}

@Schema({id:false})
class passwordUpdate{
    @Prop({})
    token:string

    @Prop({})
    expiry: Date

    @Prop({})
    passwordUpdatedAt: Date
}

@Schema({timestamps:true})
export class Tenant extends Document {
    @Prop({
        nullable:false
    })
    name:string

    @Prop({
        nullable:false
    })
    email:string

    @Prop({
        nullable:false
    })
    password:string

    @Prop({
        nullable:false
    })
    alert:boolean

    @Prop({
        nullable:false
    })
    isLoggedIn:boolean

    @Prop({})
    verification: verification

    @Prop({})
    passwordUpdate:passwordUpdate

    @Prop({
        nullable:false,
    })
    status:TenantStatus

    @Prop({
        nullable:false
    })
    contact:string

    @Prop({
        nullable:false
    })
    favorites:string[]

    @Prop({
        nullable:false
    })
    properties:string[]
}

export const TenantSchema = SchemaFactory.createForClass(Tenant)