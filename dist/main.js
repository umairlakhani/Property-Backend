"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const winston = require("winston");
const swagger_1 = require("@nestjs/swagger");
const super_admin_modules_1 = require("./superadmin/super-admin.modules");
const basicAuth = require("express-basic-auth");
const user_modules_1 = require("./user/user.modules");
const tenant_mod_module_1 = require("./tenant/tenant-mod.module");
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
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true
    });
    app.use(['/swagger/superadmin'], basicAuth({
        challenge: true,
        users: {
            'admin': '11111'
        }
    }));
    const superAdminOptions = {
        swaggerOptions: {
            authAction: {
                defaultBearerAuth: {
                    name: 'defaultBearerAuth',
                    schema: {
                        description: 'Default',
                        type: 'http',
                        in: 'header',
                        scheme: 'bearer',
                        value: '',
                    },
                },
            },
        },
    };
    const tenantOptions = {
        swaggerOptions: {
            authAction: {
                defaultBearerAuth: {
                    name: 'defaultBearerAuth',
                    schema: {
                        description: 'Default',
                        type: 'http',
                        in: 'header',
                        scheme: 'bearer',
                        value: '',
                    },
                },
            },
        },
    };
    const userOptions = {
        swaggerOptions: {
            authAction: {
                defaultBearerAuth: {
                    name: 'defaultBearerAuth',
                    schema: {
                        description: 'Default',
                        type: 'http',
                        in: 'header',
                        scheme: 'bearer',
                        value: '',
                    },
                },
            },
        },
    };
    const superAdminConfig = new swagger_1.DocumentBuilder()
        .setTitle('Property')
        .setDescription('Superadmin Api')
        .setVersion('1.0')
        .addBearerAuth(undefined, 'defaultBearerAuth')
        .build();
    const tenantsConfig = new swagger_1.DocumentBuilder()
        .setTitle('Property')
        .setDescription('Tenants api')
        .setVersion('1.0')
        .addBearerAuth(undefined, 'defaultBearerAuth')
        .build();
    const userConfig = new swagger_1.DocumentBuilder()
        .setTitle('Property')
        .setDescription('Users api')
        .setVersion('1.0')
        .addBearerAuth(undefined, 'defaultBearerAuth')
        .build();
    const superAdminDocuments = swagger_1.SwaggerModule.createDocument(app, superAdminConfig, {
        include: super_admin_modules_1.supAdminModules,
    });
    swagger_1.SwaggerModule.setup('swagger/superadmin', app, superAdminDocuments, superAdminOptions);
    const tenantDocuments = swagger_1.SwaggerModule.createDocument(app, tenantsConfig, {
        include: tenant_mod_module_1.tenantModule,
    });
    swagger_1.SwaggerModule.setup('swagger/tenant', app, tenantDocuments, tenantOptions);
    const userDocuments = swagger_1.SwaggerModule.createDocument(app, userConfig, {
        include: user_modules_1.UserModules,
    });
    swagger_1.SwaggerModule.setup('swagger/user', app, userDocuments, userOptions);
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: 422,
        transform: true,
        forbidUnknownValues: false,
        whitelist: false
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map