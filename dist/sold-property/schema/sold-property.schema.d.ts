import { Document } from "mongoose";
export declare class SoldProperty extends Document {
    tenant: string;
    property: string;
    soldAt: Date;
}
