import { Resedenial, Type } from "../schema/property.schema";
declare class ApartmentFloorDto {
    description: string;
    amenities: string;
}
declare class HouseFloorDto {
    description: string;
    amenities: string;
}
declare class ApartmentFloorPlanDto {
    floor: string;
    apartmentFloor: ApartmentFloorDto;
}
declare class HouseFloorPlanDto {
    noOfFloors: string;
    floor1: HouseFloorDto;
    floor2: HouseFloorDto;
    floor3: HouseFloorDto;
}
export declare class CreatePropertyDto {
    description: string;
    city: string;
    type: Type;
    resedential: Resedenial;
    rentPurpose: boolean;
    rent: number;
    availableFrom: Date;
    sellPurpose: boolean;
    price: number;
    forApartment: boolean;
    apartmentFloorPlan: ApartmentFloorPlanDto;
    forHouse: boolean;
    houseFloorPlan: HouseFloorPlanDto;
    area: string;
    files: any[];
}
export {};
