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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nest_winston_1 = require("nest-winston");
const user_schema_1 = require("../user/schema/user.schema");
const user_service_1 = require("../user/user.service");
const winston_1 = require("winston");
const property_schema_1 = require("./schema/property.schema");
let PropertyService = class PropertyService {
    constructor(propertyModel, userService, logger) {
        this.propertyModel = propertyModel;
        this.userService = userService;
        this.logger = logger;
    }
    async validateUser(id) {
        return await this.userService.findById(id);
    }
    async create(authUser, createPropertyDto) {
        const user = await this.validateUser(authUser.id);
        if (!user) {
            throw new common_1.BadRequestException('No landlord/agent found with this id');
        }
        if (createPropertyDto.forApartment == true &&
            createPropertyDto.forHouse == true) {
            console.log('both true');
            throw new common_1.BadRequestException('Property must be either house or apartment');
        }
        if (!createPropertyDto.forApartment && !createPropertyDto.forHouse) {
            console.log('both false');
            throw new common_1.BadRequestException('Property must be either house or apartment');
        }
        if (createPropertyDto.rentPurpose && createPropertyDto.rent == null) {
            throw new common_1.BadRequestException('Enter Rent for the property');
        }
        if (createPropertyDto.sellPurpose && createPropertyDto.price == null) {
            throw new common_1.BadRequestException('Enter Price for the property');
        }
        if (createPropertyDto.sellPurpose == true && createPropertyDto.rentPurpose == true) {
            console.log("both true");
            throw new common_1.BadRequestException('Property can either be for rent or sell purpose');
        }
        if (!createPropertyDto.sellPurpose && !createPropertyDto.rentPurpose) {
            console.log("both false");
            throw new common_1.BadRequestException('Property can either be for rent or sell purpose');
        }
        if (createPropertyDto.forApartment) {
            if (user.type == user_schema_1.Type.agent) {
                const property = await this.propertyModel.create(Object.assign(Object.assign({}, createPropertyDto), { agentId: authUser.id }));
                property.houseFloorPlan = null;
                user.properties = [...user.properties, property.id];
                if (createPropertyDto.rentPurpose) {
                    property.price = null;
                }
                else {
                    property.rent = null;
                }
                await property.save();
                await user.save();
                this.logger.info('Property listed successfully!');
                return { message: 'Property listed successfully' };
            }
            else {
                const property = await this.propertyModel.create(Object.assign(Object.assign({}, createPropertyDto), { landlordId: authUser.id }));
                user.properties.push(property.id);
                if (createPropertyDto.rentPurpose) {
                    property.price = null;
                }
                else {
                    property.rent = null;
                }
                await property.save();
                await user.save();
                this.logger.info('Property listed successfully!');
                return { message: 'Property listed successfully' };
            }
        }
        if (createPropertyDto.forHouse) {
            if (user.type == user_schema_1.Type.agent) {
                const property = await this.propertyModel.create(createPropertyDto);
                property.agentId = authUser.id;
                property.apartmentFloorPlan = null;
                user.properties.push(property.id);
                if (createPropertyDto.rentPurpose) {
                    property.price = null;
                }
                else {
                    property.rent = null;
                }
                await property.save();
                await user.save();
                return { message: 'Property listed successfully' };
            }
            else {
                const property = await this.propertyModel.create(createPropertyDto);
                property.landlordId = authUser.id;
                user.properties.push(property.id);
                if (createPropertyDto.rentPurpose) {
                    property.price = null;
                }
                else {
                    property.rent = null;
                }
                await property.save();
                await user.save();
                return { message: 'Property listed successfully' };
            }
        }
    }
};
PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, user_service_1.UserService,
        winston_1.Logger])
], PropertyService);
exports.PropertyService = PropertyService;
//# sourceMappingURL=property.service.js.map