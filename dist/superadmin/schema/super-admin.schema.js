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
exports.SuperAdminSchema = exports.SuperAdmin = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
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
let SuperAdmin = class SuperAdmin extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false
    }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", passwordUpdate)
], SuperAdmin.prototype, "passwordUpdate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        nullable: false,
        default: ""
    }),
    __metadata("design:type", String)
], SuperAdmin.prototype, "token", void 0);
SuperAdmin = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SuperAdmin);
exports.SuperAdmin = SuperAdmin;
exports.SuperAdminSchema = mongoose_1.SchemaFactory.createForClass(SuperAdmin);
//# sourceMappingURL=super-admin.schema.js.map