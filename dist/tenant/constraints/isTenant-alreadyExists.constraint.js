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
exports.IsTenantAlreadyExist = exports.IsTenantAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const tenant_service_1 = require("../tenant.service");
let IsTenantAlreadyExistConstraint = class IsTenantAlreadyExistConstraint {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async validate(email, args) {
        const user = await this.tenantService.findByEmail(email);
        if (user)
            return false;
        return true;
    }
};
IsTenantAlreadyExistConstraint = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], IsTenantAlreadyExistConstraint);
exports.IsTenantAlreadyExistConstraint = IsTenantAlreadyExistConstraint;
function IsTenantAlreadyExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTenantAlreadyExistConstraint,
        });
    };
}
exports.IsTenantAlreadyExist = IsTenantAlreadyExist;
//# sourceMappingURL=isTenant-alreadyExists.constraint.js.map