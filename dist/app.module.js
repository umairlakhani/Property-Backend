"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const email_module_1 = require("./email/email.module");
const jwt_1 = require("@nestjs/jwt");
const validation_module_1 = require("./shared-modules/validation-module");
const nest_winston_1 = require("nest-winston");
const property_module_1 = require("./property/property.module");
const sold_property_controller_1 = require("./sold-property/sold-property.controller");
const sold_property_module_1 = require("./sold-property/sold-property.module");
const superadmin_module_1 = require("./superadmin/superadmin.module");
const tenant_module_1 = require("./tenant/tenant.module");
const inspection_module_1 = require("./inspection/inspection.module");
const payment_module_1 = require("./payment/payment.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const winston = require("winston");
require("winston-daily-rotate-file");
const transportInfo = new winston.transports.DailyRotateFile({
    filename: './logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    level: 'info',
});
const transportWarn = new winston.transports.DailyRotateFile({
    filename: './logs/warn-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    level: 'warn',
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nest_winston_1.WinstonModule.forRoot({
                format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                transports: [transportInfo, transportWarn]
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configServie, connection) => ({
                    uri: configServie.get("DB_URL"),
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            email_module_1.EmailModule,
            property_module_1.PropertyModule,
            sold_property_module_1.SoldPropertyModule,
            superadmin_module_1.SuperadminModule,
            tenant_module_1.TenantModule,
            inspection_module_1.InspectionModule,
            payment_module_1.PaymentModule,
            cloudinary_module_1.CloudinaryModule
        ],
        controllers: [app_controller_1.AppController, sold_property_controller_1.SoldPropertyController],
        providers: [app_service_1.AppService, jwt_1.JwtService, common_1.Logger, ...validation_module_1.ValidationModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map