// import { HttpStatus, ValidationPipe, ValidationError } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
// import { useContainer } from 'class-validator';
// import { AppModule } from './app.module';
// import { MobileModules } from './mobile/modules';
// import { BackendModules } from './backend/modules';
// import {
//   I18nMiddleware,
//   i18nValidationErrorFactory,
//   I18nValidationException,
//   I18nValidationExceptionFilter,
// } from 'nestjs-i18n';
// import { ValidationException } from './validations/validations.exception';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
// import expressBasicAuth, * as basicAuth from 'express-basic-auth';
// import { DriverModules } from './driver/modules';
// import * as admin from 'firebase-admin';
// import { ServiceAccount } from "firebase-admin";
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
//   app.useStaticAssets(join(__dirname, '..', '/upload'), {
//     index: false,
//     prefix: '/upload',
//   });

//   app.use(['/swagger/mobile', '/swagger/backend'], basicAuth({
//     challenge: true,
//     users: {
//       'admin': '12345',
//     },

//     // authorizer:(user:string, password: string)=>{
//     //   console.log(user, password)
//     //   const userMatches = basicAuth.safeCompare(user, 'customuser')
//     //   const passwordMatches = basicAuth.safeCompare(password, 'custompassword')

//     //   return true;
//     // },
//     // authorizeAsync:true


//   }));




//   const options: SwaggerCustomOptions = {
//     swaggerOptions: {
//       authAction: {
//         defaultBearerAuth: {
//           name: 'defaultBearerAuth',
//           schema: {
//             description: 'Default',
//             type: 'http',
//             in: 'header',
//             scheme: 'bearer',
//             bearerFormat: 'JWT',
//           },
//           value: '',
//         },
//       },
//     },
//   };

//   const options_backend: SwaggerCustomOptions = {
//     swaggerOptions: {
//       authAction: {
//         defaultBearerAuth: {
//           name: 'backendBearerAuth',
//           schema: {
//             description: 'Default',
//             type: 'http',
//             in: 'header',
//             scheme: 'bearer',
//             bearerFormat: 'JWT',
//           },
//           value: '',
//         },
//       },
//     },
//   };

//   const options_driver: SwaggerCustomOptions = {
//     swaggerOptions: {
//       authAction: {
//         defaultBearerAuth: {
//           name: 'driverBearerAuth',
//           schema: {
//             description: 'Default',
//             type: 'http',
//             in: 'header',
//             scheme: 'bearer',
//             bearerFormat: 'JWT',
//           },
//           value: '',
//         },
//       },
//     },
//   };

//   const mobileConfig = new DocumentBuilder()
//     .setTitle('YAA FOODS')
//     .setDescription(`YAA Foods Mobile App API's`)
//     .setVersion('1.0')
//     .addBearerAuth(undefined, 'defaultBearerAuth')
//     .build()

//   const mobileDocument = SwaggerModule.createDocument(app, mobileConfig, {
//     include: MobileModules,
//   });

//   SwaggerModule.setup('swagger/mobile', app, mobileDocument, options);

//   const backendConfig = new DocumentBuilder()
//     .setTitle('YAA FOODS')
//     .setDescription(`YAA Foods Backend App API's`)
//     .setVersion('1.0')
//     .addBearerAuth(undefined, 'backendBearerAuth')
//     .build()
//   const document = SwaggerModule.createDocument(app, backendConfig, {
//     include: BackendModules,
//   });
//   SwaggerModule.setup('swagger/backend', app, document, options_backend);

//   const driverConfig = new DocumentBuilder()
//     .setTitle('YAA FOODS')
//     .setDescription(`YAA Foods Driver App API's`)
//     .setVersion('1.0')
//     .addBearerAuth(undefined, 'driverBearerAuth')
//     .build()
//   const Driverdocument = SwaggerModule.createDocument(app, driverConfig, {
//     include: DriverModules,
//   });
//   SwaggerModule.setup('swagger/driver', app, Driverdocument, options_driver);

//   useContainer(app.select(AppModule), { fallbackOnErrors: true });
//   // app.useGlobalFilters(new ValidationFilter)

//   app.useGlobalPipes(
//     new ValidationPipe({
//       exceptionFactory: i18nValidationErrorFactory,
//       errorHttpStatusCode: 422,
//       transform: true,
//       forbidUnknownValues: false,
//       whitelist: false
//     }),
//   );
//   app.useGlobalFilters(
//     new I18nValidationExceptionFilter({
//       // errorFormatter(errors: ValidationError[]) {
//       //   const messages = errors.map((error) => {
//       //     return {

//       //         message: Object.values(error.constraints).join(''),
//       //     }
//       // }) 
//       //   return messages
//       // },
//       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
//     }

//     ),
//   );
//   const configService: ConfigService = app.get(ConfigService);
//   const adminConfig: ServiceAccount = {
//     "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
//     "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
//                                .replace(/\\n/g, '\n'),
//     "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
//   };
//   admin.initializeApp({
//     credential: admin.credential.cert(adminConfig),
//   });

//   await app.listen(AppModule.port);
// }
// bootstrap();