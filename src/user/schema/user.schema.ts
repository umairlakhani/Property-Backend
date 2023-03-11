import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Type{
    landlord = "landlord",
    agent = "agent"
}


export enum Status{
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
export class User extends Document {
    // @Prop({})
    // id:string

    @Prop({
        nullable:false
    })
    name:string

    @Prop({
        nullable:false,
        // unique:true
    })
    email:string

    @Prop({
        nullable:false
    })
    password:string

    @Prop({
        nullable:false
    })
    contact:string

    @Prop({
        required:true,
        enum:Type,
        // default:Type.agent
    })
    type: Type

    @Prop({
        nullable:false
    })
    isLoggedIn: boolean

    @Prop({
        nullable:false,
        default:""
    })
    token:string

    @Prop({})
    verification: verification

    @Prop({})
    passwordUpdate:passwordUpdate

    @Prop({
        nullable:false,
    })
    status:Status

    @Prop({
        nullable:false
    })
    properties:any[]

    @Prop({
        nullable:false
    })
    tenantsId:string

    @Prop({
        nullable:false
    })
    tenantsPropertyId:string

    @Prop({
        nullable:false,
        type:Date,
        default:Date.now
    })
    createdAt:Date

    @Prop({
        nullable:false,
        type:Date,

    })
    updatedAt:Date




}

export const UserSchema = SchemaFactory.createForClass(User)