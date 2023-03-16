"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const email_module_1 = require("../email/email.module");
const jwt_guards_1 = require("./guards/jwt-guards");
const jwt_strategy_1 = require("./guards/jwt-strategy");
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./schema/user.schema");
const user_service_1 = require("./user.service");
const property_module_1 = require("../property/property.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule),
            (0, common_1.forwardRef)(() => property_module_1.PropertyModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_KEY'),
                    signOptions: { expiresIn: '1d' },
                }),
            })
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, jwt_guards_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map