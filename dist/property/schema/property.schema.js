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
exports.PropertySchema = exports.Property = exports.HouseFloorPlan = exports.ApartmentFloorPlan = exports.ApartmentFloor = exports.HouseFloor = exports.Status = exports.Resedenial = exports.Type = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var Type;
(function (Type) {
    Type["commercial"] = "commercial";
    Type["resedential"] = "resedential";
    Type["industrial"] = "industrial";
})(Type = exports.Type || (exports.Type = {}));
var Resedenial;
(function (Resedenial) {
    Resedenial["apartment"] = "apartment";
    Resedenial["house"] = "house";
})(Resedenial = exports.Resedenial || (exports.Resedenial = {}));
var Status;
(function (Status) {
    Status["active"] = "active";
    Status["rented"] = "rented";
    Status["sold"] = "sold";
    Status["inActive"] = "inActive";
})(Status = exports.Status || (exports.Status = {}));
let HouseFloor = class HouseFloor {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], HouseFloor.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], HouseFloor.prototype, "amenities", void 0);
HouseFloor = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], HouseFloor);
exports.HouseFloor = HouseFloor;
let ApartmentFloor = class ApartmentFloor {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], ApartmentFloor.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], ApartmentFloor.prototype, "amenities", void 0);
ApartmentFloor = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], ApartmentFloor);
exports.ApartmentFloor = ApartmentFloor;
let ApartmentFloorPlan = class ApartmentFloorPlan {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], ApartmentFloorPlan.prototype, "floor", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", ApartmentFloor)
], ApartmentFloorPlan.prototype, "apartmentFloor", void 0);
ApartmentFloorPlan = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], ApartmentFloorPlan);
exports.ApartmentFloorPlan = ApartmentFloorPlan;
let HouseFloorPlan = class HouseFloorPlan {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], HouseFloorPlan.prototype, "noOfFloors", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", HouseFloor)
], HouseFloorPlan.prototype, "floor1", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", HouseFloor)
], HouseFloorPlan.prototype, "floor2", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", HouseFloor)
], HouseFloorPlan.prototype, "floor3", void 0);
HouseFloorPlan = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], HouseFloorPlan);
exports.HouseFloorPlan = HouseFloorPlan;
let Location = class Location {
};
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Location.prototype, "pinLocation", void 0);
Location = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], Location);
let Property = class Property extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        ref: 'UserSchema',
    }),
    __metadata("design:type", String)
], Property.prototype, "agentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        ref: 'UserSchema',
    }),
    __metadata("design:type", String)
], Property.prototype, "landlordId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: Type.resedential
    }),
    __metadata("design:type", String)
], Property.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: Resedenial.apartment
    }),
    __metadata("design:type", String)
], Property.prototype, "resedential", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "forApartment", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "forHouse", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        required: function () {
            return this.forApartment;
        }
    }),
    __metadata("design:type", ApartmentFloorPlan)
], Property.prototype, "apartmentFloorPlan", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        required: function () {
            return this.forHouse;
        }
    }),
    __metadata("design:type", HouseFloorPlan)
], Property.prototype, "houseFloorPlan", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "rentPurpose", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number || null,
        required: function () {
            return this.rentPurpose;
        }
    }),
    __metadata("design:type", Number)
], Property.prototype, "rent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "sellPurpose", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number || null,
        required: function () {
            return this.sellPurpose;
        }
    }),
    __metadata("design:type", Number)
], Property.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Array)
], Property.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Property.prototype, "area", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Location)
], Property.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: function () {
            return this.rentPurpose;
        }
    }),
    __metadata("design:type", Date)
], Property.prototype, "availableFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        default: Status.active
    }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Array)
], Property.prototype, "favorites", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: 'InspectionSchema',
    }),
    __metadata("design:type", String)
], Property.prototype, "inspection", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        ref: 'PaymentSchema',
    }),
    __metadata("design:type", String)
], Property.prototype, "payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Property.prototype, "reviews", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Property.prototype, "ratings", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "sold", void 0);
Property = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Property);
exports.Property = Property;
exports.PropertySchema = mongoose_1.SchemaFactory.createForClass(Property);
//# sourceMappingURL=property.schema.js.map