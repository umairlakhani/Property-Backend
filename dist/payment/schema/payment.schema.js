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
exports.PaymentSchema = exports.Status = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var Status;
(function (Status) {
    Status["active"] = "active";
    Status["inActive"] = "inActive";
})(Status = exports.Status || (exports.Status = {}));
let Details = class Details {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Details.prototype, "cardNo", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Details.prototype, "pin", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Date)
], Details.prototype, "expiry", void 0);
Details = __decorate([
    (0, mongoose_1.Schema)({ id: false })
], Details);
let Payment = class Payment extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Payment.prototype, "paymentType", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Payment.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Details)
], Payment.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: Status.active
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
Payment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Payment);
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
//# sourceMappingURL=payment.schema.js.map