import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
class Inspection extends Document{
    @Prop({})
    tenantId:string

    @Prop({})
    name:string

    @Prop({})
    email:string

    @Prop({})
    contact:string

    @Prop({})
    message:string

    @Prop({})
    date:Date
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection)
