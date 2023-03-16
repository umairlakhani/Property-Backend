import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
export class SuperAdmin extends Document{
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

    @Prop({})
    passwordUpdate:passwordUpdate

    @Prop({
        nullable:false,
        default:""
    })
    token:string
    
}
export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin)
