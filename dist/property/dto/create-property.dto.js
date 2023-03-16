"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePropertyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const property_schema_1 = require("../schema/property.schema");
class ApartmentFloorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], ApartmentFloorDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], ApartmentFloorDto.prototype, "amenities", void 0);
class HouseFloorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], HouseFloorDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], HouseFloorDto.prototype, "amenities", void 0);
class ApartmentFloorPlanDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], ApartmentFloorPlanDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ApartmentFloorDto
    }),
    __metadata("design:type", ApartmentFloorDto)
], ApartmentFloorPlanDto.prototype, "apartmentFloor", void 0);
class HouseFloorPlanDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], HouseFloorPlanDto.prototype, "noOfFloors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: HouseFloorDto
    }),
    __metadata("design:type", HouseFloorDto)
], HouseFloorPlanDto.prototype, "floor1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: HouseFloorDto
    }),
    __metadata("design:type", HouseFloorDto)
], HouseFloorPlanDto.prototype, "floor2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: HouseFloorDto
    }),
    __metadata("design:type", HouseFloorDto)
], HouseFloorPlanDto.prototype, "floor3", void 0);
class Location {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], Location.prototype, "pinLocation", void 0);
class CreatePropertyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "resedential", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        default: true,
        required: true
    }),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "rentPurpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "rent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        default: new Date()
    }),
    __metadata("design:type", Date)
], CreatePropertyDto.prototype, "availableFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        default: false,
        required: false
    }),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "sellPurpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
    }),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        default: true,
        required: false
    }),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "forApartment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ApartmentFloorPlanDto,
    }),
    __metadata("design:type", ApartmentFloorPlanDto)
], CreatePropertyDto.prototype, "apartmentFloorPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        default: false,
        required: false
    }),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "forHouse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: HouseFloorPlanDto,
    }),
    __metadata("design:type", HouseFloorPlanDto)
], CreatePropertyDto.prototype, "houseFloorPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String
    }),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "area", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        nullable: false,
        items: {
            type: 'string',
            format: 'binary',
        },
    }),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "files", void 0);
exports.CreatePropertyDto = CreatePropertyDto;
//# sourceMappingURL=create-property.dto.js.map