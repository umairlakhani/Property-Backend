import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Status{
    active="active",
    inActive="inActive"
}
@Schema({id:false})
class Details{
    @Prop({})
    cardNo:string

    @Prop({})
    pin:string

    @Prop({})
    expiry:Date
}

@Schema({timestamps:true})
class Payment extends Document{
    @Prop({})
    paymentType:string

    @Prop({})
    tenantId:string

    @Prop({})
    details:Details

    @Prop({
        default:Status.active   
    })
    status:Status
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
