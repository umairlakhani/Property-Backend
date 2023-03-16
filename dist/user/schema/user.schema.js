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
exports.UserSchema = exports.User = exports.Status = exports.Type = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var Type;
(function (Type) {
    Type["landlord"] = "landlord";
    Type["agent"] = "agent";
})(Type = exports.Type || (exports.Type = {}));
var Status;
(function (Status) {
    Status["active"] = "active";
    Status["notActive"] = "notActive";
})(Status = exports.Status || (exports.Status = {}));
let verification = class verification {
};
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], verification.prototype, "isVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], verification.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Date)
], verification.prototype, "expiry", void 0);
verification = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], verification);
let passwordUpdate = class passwordUpdate {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], passwordUpdate.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Date)
], passwordUpdate.prototype, "expiry", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Date)
], passwordUpdate.prototype, "passwordUpdatedAt", void 0);
passwordUpdate = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], passwordUpdate);
let User = class User extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Type,
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        default: ""
    }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", verification)
], User.prototype, "verification", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", passwordUpdate)
], User.prototype, "passwordUpdate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Array)
], User.prototype, "properties", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "tenantsId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], User.prototype, "tenantsPropertyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        type: Date,
        default: Date.now
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        type: Date,
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map