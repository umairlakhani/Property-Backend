import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { INestApplication, Type } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SuperadminModule } from './superadmin/superadmin.module';
import { supAdminModules } from './superadmin/super-admin.modules';
import expressBasicAuth, * as basicAuth from 'express-basic-auth';
import { UserModules } from './user/user.modules';
import { tenantModule } from './tenant/tenant-mod.module';

// import {
//   I18nMiddleware,
//   i18nValidationErrorFactory,
//   I18nValidationException,
//   I18nValidationExceptionFilter,
// } from 'nestjs-i18n';
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
  const app = await NestFactory.create(AppModule, { cors: true
    // , logger:false
  });
  app.use(['/swagger/superadmin'], basicAuth({
    challenge: true,
    users: {
      'admin':'11111'
    }
  }))
  const superAdminOptions:SwaggerCustomOptions = {
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
  const tenantOptions:SwaggerCustomOptions = {
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
  const userOptions:SwaggerCustomOptions = {
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
  
  const superAdminConfig = new DocumentBuilder()
    .setTitle('Property')
    .setDescription('Superadmin Api')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

    const tenantsConfig = new DocumentBuilder()
    .setTitle('Property')
    .setDescription('Tenants api')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

    const userConfig = new DocumentBuilder()
    .setTitle('Property')
    .setDescription('Users api')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

    const superAdminDocuments = SwaggerModule.createDocument(app,superAdminConfig,{
      include: supAdminModules,
    })
    SwaggerModule.setup('swagger/superadmin',app,superAdminDocuments,superAdminOptions)

    const tenantDocuments = SwaggerModule.createDocument(app,tenantsConfig,{
      include: tenantModule,
    })
    SwaggerModule.setup('swagger/tenant',app,tenantDocuments,tenantOptions)

    const userDocuments = SwaggerModule.createDocument(app,userConfig,{
      include: UserModules,
    })
    SwaggerModule.setup('swagger/user',app,userDocuments,userOptions)

    
  // const config = new DocumentBuilder()
  //   .setTitle('Property')
  //   .setDescription('Property app description')
  //   .setVersion('1.0')
  //   .addBearerAuth(undefined, 'defaultBearerAuth')
  //   .build();

  // configure swagger options
  // const options = {
  //   swaggerOptions: {
  //     authAction: {
  //       defaultBearerAuth: {
  //         name: 'defaultBearerAuth',
  //         schema: {
  //           description: 'Default',
  //           type: 'http',
  //           in: 'header',
  //           scheme: 'bearer',
  //           value: '',
  //         },
  //       },
  //     },
  //   },
  // };
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document, options);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ 
    // exceptionFactory: i18nValidationErrorFactory,
      errorHttpStatusCode: 422,
      transform: true,
      forbidUnknownValues: false,
      whitelist: false
  }));
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}
bootstrap();
