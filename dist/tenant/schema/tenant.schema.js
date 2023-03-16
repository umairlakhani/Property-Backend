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
exports.TenantSchema = exports.Tenant = exports.TenantStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var TenantStatus;
(function (TenantStatus) {
    TenantStatus["active"] = "active";
    TenantStatus["notActive"] = "notActive";
})(TenantStatus = exports.TenantStatus || (exports.TenantStatus = {}));
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
let Tenant = class Tenant extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Tenant.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Tenant.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "alert", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isLoggedIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", verification)
], Tenant.prototype, "verification", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", passwordUpdate)
], Tenant.prototype, "passwordUpdate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Tenant.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], Tenant.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Array)
], Tenant.prototype, "favorites", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", Array)
], Tenant.prototype, "properties", void 0);
Tenant = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Tenant);
exports.Tenant = Tenant;
exports.TenantSchema = mongoose_1.SchemaFactory.createForClass(Tenant);
//# sourceMappingURL=tenant.schema.js.map