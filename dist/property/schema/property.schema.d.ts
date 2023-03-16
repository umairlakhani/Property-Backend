import mongoose, { Document } from "mongoose";
export declare enum Type {
    commercial = "commercial",
    resedential = "resedential",
    industrial = "industrial"
}
export declare enum Resedenial {
    apartment = "apartment",
    house = "house"
}
export declare enum Status {
    active = "active",
    rented = "rented",
    sold = "sold",
    inActive = "inActive"
}
export declare class HouseFloor {
    description: string;
    amenities: string;
}
export declare class ApartmentFloor {
    description: string;
    amenities: string;
}
export declare class ApartmentFloorPlan {
    floor: string;
    apartmentFloor: ApartmentFloor;
}
export declare class HouseFloorPlan {
    noOfFloors: string;
    floor1: HouseFloor;
    floor2: HouseFloor;
    floor3: HouseFloor;
}
declare class Location {
    address: string;
    pinLocation: string;
}
export declare class Property extends Document {
    description: string;
    city: string;
    agentId: string;
    landlordId: string;
    type: Type;
    resedential: Resedenial;
    forApartment: boolean;
    forHouse: boolean;
    apartmentFloorPlan: ApartmentFloorPlan;
    houseFloorPlan: HouseFloorPlan;
    rentPurpose: boolean;
    rent: number | null;
    sellPurpose: boolean;
    price: number | null;
    files: string[];
    area: string;
    location: Location;
    availableFrom: Date;
    isAvailable: boolean;
    status: Status;
    favorites: string[];
    inspection: string;
    payment: string;
    reviews: string;
    ratings: string;
    sold: boolean;
}
export declare const PropertySchema: mongoose.Schema<Property, mongoose.Model<Property, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Property>;
export {};
