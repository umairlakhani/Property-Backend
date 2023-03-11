import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})

export class SoldProperty extends Document{
    @Prop({
        required:false
    })
    tenant:string

    @Prop({
        required:false
    })
    property:string

    @Prop({
        required:false
    })
    soldAt:Date

}